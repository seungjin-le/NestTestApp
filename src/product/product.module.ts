import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ProductController } from "./product.controller";
import { PRODUCT_MODEL_NAME, ProductSchema } from "./product.schema";
import { ProductService } from "./product.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: PRODUCT_MODEL_NAME, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
