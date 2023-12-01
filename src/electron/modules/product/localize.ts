import { ProductEntity } from "@/electron/core/product/entity/product";

const messages = {
  Required: " Requerido",
};

const fields = {
  [ProductEntity.nameof("name")]: " Nome",
  [ProductEntity.nameof("price")]: " Preço",
  [ProductEntity.nameof("description")]: " Descrição",
};

type BadRequestInput = {
  message: string;
  field: string;
};

export class ProductLocalize {
  static getBadRequestMessage({ field, message }: BadRequestInput) {
    return `${fields[field]}:{${messages[message]}}`;
  }
}
