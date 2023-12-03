import { ProductEntity } from "../entity/product";
import { IProductRepository } from "../repository/product";
import { PaginationInput } from "@/electron/utils/pagination";

export type ProductListOutput = ProductEntity[];

export class ProductListUsecase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: PaginationInput): Promise<ProductListOutput> {
    return this.productRepository.paginate(input);
  }
}
