import { MessageType } from "./service";

export abstract class ILoggerService {
  abstract log(message: string): void;
  abstract trace(input: MessageType): void;
  abstract info(input: MessageType): void;
  abstract warn(input: MessageType): void;
}
