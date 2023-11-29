import { ElectronAPI } from "@electron-toolkit/preload";

type AppWindow = {
  electron: ElectronAPI;
  api: unknown;
};

export const AppWindow = window as AppWindow;
