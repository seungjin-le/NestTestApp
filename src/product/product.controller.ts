import { Body, Post } from "@nestjs/common";

import { apiBody, apiOperation, apiResponse, controller } from "@/utils/apiDecorators";

import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";

@controller("Product", "v1/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @apiBody("상품 등록 정보", CreateProductDto)
  @apiOperation("상품 등록", "쇼핑몰 상품을 등록합니다.")
  @apiResponse(201, "상품 등록 성공")
  @apiResponse(400, "상품 등록 실패")
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
}
