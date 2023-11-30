import { z } from "zod";

import { BaseEntity } from "@/electron/utils/entity";
import { TextUtils } from "@/electron/utils/text";

const ID = z.string().uuid();
const Name = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .transform(TextUtils.capitalizeFirstLetter);
const Description = z.string().trim().min(1).max(200);
const Price = z.number().min(0.01);
const CreatedAt = z.date().default(new Date());
const UpdatedAt = z.date().default(new Date());
const DeletedAt = z.date().nullish();

export const ProductEntitySchema = z.object({
  id: ID,
  name: Name,
  description: Description,
  price: Price,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
  deletedAt: DeletedAt,
});

type Product = z.infer<typeof ProductEntitySchema>;

export class ProductEntity extends BaseEntity<ProductEntity>(
  ProductEntitySchema,
) {
  name!: string;

  description!: string;

  price!: number;

  constructor(entity: Partial<Product>) {
    super();
    Object.assign(this, this.validate<Product>(entity));
  }
}
