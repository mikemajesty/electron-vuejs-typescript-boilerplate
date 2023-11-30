import { DataBase } from "@/electron/infra/database";
import { ProductEntity } from "@/electron/core/product/entity/product";
import { Repository } from "@/electron/infra/repository/repository";
import { IProductRepository } from "@/electron/core/product/repository/product";

export class ProductRepository
  extends Repository<ProductEntity>
  implements IProductRepository
{
  constructor() {
    super({ instance: DataBase.instance, tableName: "products" });
  }
}
