import { app, shell, BrowserWindow, ipcMain } from "electron";
import path, { join } from "path";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import { SecretService } from "./infra/secrets/service";
import { DataBase } from "./infra/database";
import { ProductController } from "./modules/product/controler";
import { ProductRepository } from "./modules/product/repository";

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 670,
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
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
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

  const productController = new ProductController(new ProductRepository());
  ipcMain.on("createProduct", productController.create);

  const connection = DataBase.instance;

  await connection.raw(
    "CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, name TEXT, description TEXT, price REAL, createdAt DATE, updatedAt DATE, deletedAt DATE);",
  );
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
