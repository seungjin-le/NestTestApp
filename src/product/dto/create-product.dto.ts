import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsInt, IsNumber, IsOptional, IsString, IsUrl, Min } from "class-validator";

import { PRODUCT_STATUS, PRODUCT_STATUSES, ProductStatus } from "../product.types";

export class CreateProductDto {
  @ApiProperty({ description: "상품명", example: "베이직 반팔 티셔츠" })
  @IsString()
  name: string;

  @ApiProperty({ description: "상품 상세 설명", example: "부드러운 면 소재의 기본 티셔츠" })
  @IsString()
  description: string;

  @ApiProperty({ description: "판매가", example: 19900 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: "카테고리 ID", example: "category-1" })
  @IsString()
  categoryId: string;

  @ApiProperty({ description: "대표 이미지 URL", example: "https://example.com/product.png" })
  @IsUrl()
  thumbnailUrl: string;

  @ApiProperty({ description: "재고 수량", example: 100 })
  @IsInt()
  @Min(0)
  stockQuantity: number;

  @ApiPropertyOptional({
    description: "상품 상태",
    enum: PRODUCT_STATUSES,
    example: PRODUCT_STATUS.DRAFT,
  })
  @IsOptional()
  @IsIn(PRODUCT_STATUSES)
  status?: ProductStatus;
}
