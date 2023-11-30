import { ElectronAPI } from "@electron-toolkit/preload";

type AppWindow = {
  electron: ElectronAPI;
  api: unknown;
  appVersion: string;
};

export const AppWindow = window as unknown as AppWindow;
