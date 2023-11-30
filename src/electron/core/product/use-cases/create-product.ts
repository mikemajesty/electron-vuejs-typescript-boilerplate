import { z } from "zod";
import { ProductEntity, ProductEntitySchema } from "../entity/product";
import { IProductRepository } from "../repository/product";

export const ProductCreateSchema = ProductEntitySchema.pick({
  name: true,
  description: true,
  price: true,
});

export type ProductCreateInput = z.infer<typeof ProductCreateSchema>;
export type ProductCreateOutput = ProductEntity | null;

export class ProductCreateUsecase {
  constructor(private productRepository: IProductRepository) {}

  async execute(input: ProductCreateInput): Promise<ProductCreateOutput> {
    const entity = new ProductEntity(input);

    return this.productRepository.create(entity);
  }
}
