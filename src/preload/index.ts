import { contextBridge } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { version } from "../../package.json";
const api = {};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
    contextBridge.exposeInMainWorld("appVersion", version);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.appVersion = version;
  // @ts-ignore (define in dts)
  window.api = api;

  window.global = window;
}
