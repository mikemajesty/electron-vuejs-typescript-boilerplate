import { IpcMainEvent } from "electron";
import { IRepository } from "../infra/repository";

export type ElectronMainEventType = IpcMainEvent & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  repository: IRepository<any>;
};
