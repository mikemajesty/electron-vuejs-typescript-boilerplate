import pino, { Logger } from "pino";
import { DateUtils } from "@/electron/utils/date";

class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = pino({
      useLevelLabels: true,
      level: "trace",
    });
  }

  log(message: string): void {
    this.logger.trace(message);
  }

  trace({ message, context, obj = {} }: MessageType): void {
    Object.assign(obj, { context, createdAt: DateUtils.getISODateString() });
    this.logger.trace([obj, message].find(Boolean), message);
  }

  info({ message, context, obj = {} }: MessageType): void {
    Object.assign(obj, { context, createdAt: DateUtils.getISODateString() });
    this.logger.info([obj, message].find(Boolean), message);
  }

  warn({ message, context, obj = {} }: MessageType): void {
    Object.assign(obj, { context, createdAt: DateUtils.getISODateString() });
    this.logger.warn([obj, message].find(Boolean), message);
  }
}

const Logger = new LoggerService();

export { Logger };

export type MessageType = {
  message: string;
  context?: string;
  obj?: object;
};
