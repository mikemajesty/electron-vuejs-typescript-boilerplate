import { z } from "zod";
import { ProductEntity, ProductEntitySchema } from "../entity/product";
import { IProductRepository } from "../repository/product";

export const ProductDeleteSchema = ProductEntitySchema.pick({ id: true });

export type ProductDeleteInput = z.infer<typeof ProductDeleteSchema>;
export type ProductDeleteOutput = ProductEntity;

export class ProductDeleteUsecase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute({ id }: ProductDeleteInput): Promise<ProductDeleteOutput> {
    const finded = await this.productRepository.findOne({ id });

    if (!finded) {
      throw new Error("product not found");
    }

    await this.productRepository.remove({ id });
    return finded;
  }
}
