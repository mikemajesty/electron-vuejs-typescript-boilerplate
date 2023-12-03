import { DataBase } from "@/electron/infra/database";
import { ProductEntity } from "@/electron/core/product/entity/product";
import { Repository } from "@/electron/infra/repository/repository";
import { IProductRepository } from "@/electron/core/product/repository/product";
import { PaginationInput } from "@/electron/utils/pagination";

export class ProductRepository
  extends Repository<ProductEntity>
  implements IProductRepository
{
  constructor() {
    super({ instance: DataBase.instance, tableName: "products" });
  }

  async paginate(input: PaginationInput) {
    const products = await this.parameters
      .instance(this.parameters.tableName)
      .paginate({
        perPage: input.limit,
        currentPage: input.page,
      });

    return products;
  }
}
