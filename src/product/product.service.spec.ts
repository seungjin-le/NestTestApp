import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { PRODUCT_STATUS } from "./product.types";

type ProductModelMock = {
  create: jest.Mock;
};

describe("ProductService", () => {
  const createProductDto: CreateProductDto = {
    name: "테스트 상품",
    description: "상품 상세 설명",
    price: 10000,
    categoryId: "category-1",
    thumbnailUrl: "https://example.com/product.png",
    stockQuantity: 10,
    status: PRODUCT_STATUS.ACTIVE,
  };

  const createService = (productModel: ProductModelMock): ProductService => {
    return new ProductService(productModel as never);
  };

  it("registers a product", async () => {
    const productModel = {
      create: jest.fn().mockResolvedValue({
        ...createProductDto,
        _id: "product-1",
        isDisplayed: true,
        isDeleted: false,
      }),
    };
    const service = createService(productModel);

    const result = await service.create(createProductDto);

    expect(productModel.create).toHaveBeenCalledWith({
      ...createProductDto,
      isDisplayed: true,
      isDeleted: false,
    });
    expect(result).toMatchObject({
      status: 201,
      message: "상품 등록 성공",
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
      },
    });
  });

  it("uses draft status when status is not provided", async () => {
    const { status: _status, ...body } = createProductDto;
    const productModel = {
      create: jest.fn().mockResolvedValue({
        ...body,
        status: PRODUCT_STATUS.DRAFT,
        _id: "product-1",
      }),
    };
    const service = createService(productModel);

    await service.create(body);

    expect(productModel.create).toHaveBeenCalledWith({
      ...body,
      status: PRODUCT_STATUS.DRAFT,
      isDisplayed: false,
      isDeleted: false,
    });
  });
});
