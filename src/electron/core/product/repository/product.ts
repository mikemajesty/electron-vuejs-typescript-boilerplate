import { IRepository } from "@/electron/infra/repository";
import { ProductEntity } from "../entity/product";

export abstract class IProductRepository extends IRepository<ProductEntity> {}
