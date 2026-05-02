import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateProductDto } from "./dto/create-product.dto";
import { PRODUCT_MODEL_NAME, ProductDocument } from "./product.schema";
import { PRODUCT_STATUS } from "./product.types";

type ProductCreateResponse = {
  status: number;
  message: string;
  data: ProductDocument;
};

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(PRODUCT_MODEL_NAME) private readonly productModel: Model<ProductDocument>
  ) {}

  async create(body: CreateProductDto): Promise<ProductCreateResponse> {
    const status = body.status ?? PRODUCT_STATUS.DRAFT;
    const product = await this.productModel.create({
      ...body,
      status,
      isDisplayed: status === PRODUCT_STATUS.ACTIVE,
      isDeleted: false,
    });

    return {
      status: 201,
      message: "상품 등록 성공",
      data: product,
    };
  }
}
