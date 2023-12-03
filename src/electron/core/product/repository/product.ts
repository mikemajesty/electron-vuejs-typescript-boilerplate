import { IRepository } from "@/electron/infra/repository";
import { ProductEntity } from "../entity/product";
import { PaginationInput } from "@/electron/utils/pagination";

export abstract class IProductRepository extends IRepository<ProductEntity> {
  abstract paginate(input: PaginationInput);
}
