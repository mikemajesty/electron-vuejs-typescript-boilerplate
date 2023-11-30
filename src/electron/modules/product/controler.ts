import { Notification } from "electron";
import {
  ProductDeleteInput,
  ProductDeleteOutput,
  ProductDeleteUsecase,
} from "@/electron/core/product/use-cases/delete-product";
import {
  ProductListInput,
  ProductListOutput,
  ProductListUsecase,
} from "@/electron/core/product/use-cases/list-product";
import {
  ProductUpdateInput,
  ProductUpdateOutput,
  ProductUpdateUsecase,
} from "@/electron/core/product/use-cases/update-product";
import {
  ProductCreateInput,
  ProductCreateOutput,
  ProductCreateUsecase,
} from "@/electron/core/product/use-cases/create-product";
import { ElectronMainEventType } from "@/electron/utils/electron";

export class ProductController {
  async create(
    event: ElectronMainEventType,
    input: ProductCreateInput,
  ): Promise<ProductCreateOutput> {
    const createUsecase = new ProductCreateUsecase(event.repository);
    const response = await createUsecase.execute(input);
    new Notification({
      title: "Product Created",
      body: `Produto ${response?.name}: criado com sucesso!`,
    }).show();
    return response;
  }

  async delete(
    event: ElectronMainEventType,
    input: ProductDeleteInput,
  ): Promise<ProductDeleteOutput> {
    const response = await new ProductDeleteUsecase(event.repository).execute(
      input,
    );
    new Notification({
      title: "Product Deleted",
      body: `Produto ${response.name}: deletado com sucesso.`,
    }).show();
    return response;
  }

  async update(
    event: ElectronMainEventType,
    input: ProductUpdateInput,
  ): Promise<ProductUpdateOutput> {
    const response = await new ProductUpdateUsecase(event.repository).execute(
      input,
    );
    new Notification({
      title: "Product Updated",
      body: `Produto ${response?.name}: alterado com sucesso.`,
    }).show();
    return response;
  }

  async list(
    event: ElectronMainEventType,
    input: ProductListInput,
  ): Promise<ProductListOutput> {
    const response = await new ProductListUsecase(event.repository).execute(
      input,
    );
    return response;
  }
}
