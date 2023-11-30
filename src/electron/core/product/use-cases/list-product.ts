import { z } from "zod";
import { ProductEntity } from "../entity/product";
import { IProductRepository } from "../repository/product";

export const ProductListSchema = z.object({
  search: z.record(z.string(), z.string()),
});

export type ProductListInput = z.infer<typeof ProductListSchema>;
export type ProductListOutput = ProductEntity[];

export class ProductListUsecase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: ProductListInput): Promise<ProductListOutput> {
    return this.productRepository.find(input.search);
  }
}
