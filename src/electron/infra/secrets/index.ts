import { Secret } from "./service";
import { ISecretService } from "./adapter";

const SecretService: ISecretService = new Secret();

export { SecretService };
