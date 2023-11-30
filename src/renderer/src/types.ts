import { ElectronAPI } from "@electron-toolkit/preload";

type AppWindow = {
  electron: ElectronAPI;
  api: unknown;
  appVersion: string;
};
console.log("windowwindowwindow", window["appVersion"]);

export const AppWindow = window as unknown as AppWindow;
