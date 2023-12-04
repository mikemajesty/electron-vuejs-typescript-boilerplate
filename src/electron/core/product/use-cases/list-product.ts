import { ProductEntity } from "../entity/product";
import { IProductRepository } from "../repository/product";
import { PaginationInput, PaginationOutput } from "@/electron/utils/pagination";

export type ProductListOutput = PaginationOutput<ProductEntity>;

export class ProductListUsecase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: PaginationInput): Promise<ProductListOutput> {
    return this.productRepository.paginate(input);
  }
}
