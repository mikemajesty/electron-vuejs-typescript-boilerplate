import { DataBase } from "@/electron/infra/database";
import { ProductEntity } from "@/electron/core/product/entity/product";
import { Repository } from "@/electron/infra/repository/repository";

export class ProductRepository extends Repository<ProductEntity> {
  constructor() {
    super({ instance: DataBase.instance, tableName: "products" });
  }
}
