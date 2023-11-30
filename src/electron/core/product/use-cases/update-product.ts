import { z } from "zod";
import { ProductEntity, ProductEntitySchema } from "../entity/product";
import { ProductRepository } from "@/electron/modules/product/repository";

export const ProductUpdateSchema = ProductEntitySchema.pick({ id: true })
  .merge(
    ProductEntitySchema.pick({
      name: true,
      description: true,
      price: true,
    }),
  )
  .optional();

export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>;
export type ProductUpdateOutput = ProductEntity | null;

export class ProductUpdateUsecase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: ProductUpdateInput): Promise<ProductUpdateOutput> {
    const finded = await this.productRepository.findOne({
      id: input?.id as string,
    });

    if (!finded) {
      throw new Error("product not found");
    }

    return this.productRepository.update(
      { id: finded.id },
      { ...finded, ...input },
    );
  }
}
