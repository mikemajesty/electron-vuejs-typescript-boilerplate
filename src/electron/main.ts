import {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  IpcMainEvent,
  dialog,
  IpcMainInvokeEvent,
} from "electron";
import path, { join } from "path";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import { SecretService } from "./infra/secrets";
import { DataBase } from "./infra/database";
import { ProductController } from "./modules/product/controler";
import { ProductRepository } from "./modules/product/repository";
import { ProductCreateInput } from "./core/product/use-cases/create-product";
import { ZodIssue } from "zod";
import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pt/zod.json";
import { TranslationUtils } from "./utils/translation";
import { SortEnum } from "./utils/sort";
import { PaginationInput } from "./utils/pagination";
import { ProductEntity } from "./core/product/entity/product";

i18next.init({
  lng: "pt",
  resources: {
    pt: { zod: translation },
  },
});

z.setErrorMap(zodI18nMap);

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../../resources/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (SecretService.isDev && SecretService.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(SecretService.ELECTRON_RENDERER_URL);
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  process.on("unhandledRejection", (exception: any) => {
    if (exception?.errors && exception?.issues) {
      const error = exception.issues
        .map(
          (i: ZodIssue) =>
            `${TranslationUtils.getPropertyName(`${i.path}`)}: ${i.message}`,
        )
        .join(",\n");
      dialog.showErrorBox("Erro de validação.", error);
      return;
    }
    dialog.showErrorBox("Error inesperado.", exception?.message || exception);
  });
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  const connection = DataBase.instance;

  await connection.raw(
    "CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, name TEXT, description TEXT, price REAL, createdAt DATE, updatedAt DATE, deletedAt DATE);",
  );

  registerProductEvents();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const registerProductEvents = () => {
  const productController = new ProductController();
  ipcMain.on(
    "createProduct",
    (event: IpcMainEvent, input: ProductCreateInput) => {
      return productController.create(
        { ...event, infra: { repository: new ProductRepository() } },
        input,
      );
    },
  );

  ipcMain.handle(
    "listProduct",
    (event: IpcMainInvokeEvent, input: PaginationInput<ProductEntity>) => {
      return productController.list(
        { ...event, infra: { repository: new ProductRepository() } },
        {
          limit: input?.limit || 10,
          page: input?.page || 1,
          search: input.search,
          sort: { createdAt: SortEnum.desc },
        },
      );
    },
  );
};
