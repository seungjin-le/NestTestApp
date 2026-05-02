import { Document, Schema, SchemaOptions } from "mongoose";

import { PRODUCT_STATUS, PRODUCT_STATUSES, ProductStatus } from "./product.types";

export const PRODUCT_MODEL_NAME = "Product";

const options: SchemaOptions<ProductDocument> = {
  timestamps: true,
  collection: "product",
  versionKey: false,
};

export interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  thumbnailUrl: string;
  stockQuantity: number;
  status: ProductStatus;
  isDisplayed: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    categoryId: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    stockQuantity: { type: Number, required: true, min: 0 },
    status: { type: String, enum: PRODUCT_STATUSES, default: PRODUCT_STATUS.DRAFT },
    isDisplayed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  options
);
