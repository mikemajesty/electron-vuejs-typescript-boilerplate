import { ProductEntity } from "../core/product/entity/product";
import { TextUtils } from "./text";

export class TranslationUtils {
  private static messages = {
    [ProductEntity.nameof("name")]: "nome",
    [ProductEntity.nameof("price")]: "preço",
    [ProductEntity.nameof("description")]: "descrição",
  };

  static getPropertyName(text: string) {
    return TextUtils.capitalizeFirstLetter(this.messages[text] || text);
  }
}
