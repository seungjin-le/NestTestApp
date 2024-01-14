import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 글로벌 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Swagger 설정
  setupSwagger(app);

  // 애플리케이션 리스닝
  await app.listen(3000);
}

/**
 * Swagger 설정 함수
 *
 * @param {INestApplication} app
 */
function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle("NestJS Study API Docs")
    .setDescription("NestJS Study API description")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // Swagger UI가 사용할 endpoint 설정 (예: /api-docs)
  SwaggerModule.setup("api-docs", app, document);
}

bootstrap();
