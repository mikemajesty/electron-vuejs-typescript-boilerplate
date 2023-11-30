import "dotenv/config";

export class SecretService {
  static isDev = process.env.ENV === "dev" ? true : false;
  static ELECTRON_RENDERER_URL = process.env["ELECTRON_RENDERER_URL"];
}
