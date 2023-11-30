import "dotenv/config";
import { ISecretService } from "./adapter";

export class Secret implements ISecretService {
  isDev = process.env.ENV === "dev" ? true : false;
  ELECTRON_RENDERER_URL = process.env["ELECTRON_RENDERER_URL"] as string;
}
