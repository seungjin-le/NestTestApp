import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 글로벌 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은(데코레이터가 없는) 속성들을 자동으로 제거
      forbidNonWhitelisted: true, // "true로 설정하면, 허용되지 않은 속성들을 제거하는 대신 validator가 에러를 발생
      transform: true, // DTO에서 타입 변환
    })
  );

  // Swagger 설정
  const options = new DocumentBuilder()
    .setTitle("NestJS 연습용 API Docs")
    .setDescription("NestJS 연습용")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, options, {});

  // Swagger UI가 사용할 endpoint 설정
  SwaggerModule.setup("api-docs", app, document);
  app.enableCors(); // CORS 설정 추가

  await app.listen(3000, "0.0.0.0");
}

bootstrap();
