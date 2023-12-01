import { IpcMainEvent } from "electron";
import { IRepository } from "../infra/repository";
import { ILoggerService } from "../infra/logger/adapter";
import { ISecretService } from "../infra/secrets/adapter";

type InfraType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  repository: IRepository<any>;
  logger: ILoggerService;
  secret: ISecretService;
};

export type ElectronMainEventType = IpcMainEvent & {
  infra: Partial<InfraType>;
};
