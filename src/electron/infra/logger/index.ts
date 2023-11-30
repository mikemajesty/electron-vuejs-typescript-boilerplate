import { Logger } from "./service";
import { ILoggerService } from "./adapter";

const LoggerService: ILoggerService = new Logger();

export { LoggerService };
