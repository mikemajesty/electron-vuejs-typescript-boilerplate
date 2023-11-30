import { z } from "zod";
import { ProductEntity } from "../entity/product";
import { ProductRepository } from "@/electron/modules/product/repository";

export const ProductListSchema = z.object({
  search: z.record(z.string(), z.string()),
});

export type ProductListInput = z.infer<typeof ProductListSchema>;
export type ProductListOutput = ProductEntity[];

export class ProductListUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: ProductListInput): Promise<ProductListOutput> {
    return this.productRepository.find(input.search);
  }
}
