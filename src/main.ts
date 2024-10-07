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
  const options = new DocumentBuilder()
    .setTitle("NestJS 연습용 API Docs")
    .setDescription("NestJS 연습용 프로젝트")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, options, {});

  // Swagger UI가 사용할 endpoint 설정
  SwaggerModule.setup("api-docs", app, document);
  app.enableCors(); // CORS 설정 추가
  // 애플리케이션 리스닝
  await app.listen(3000, "0.0.0.0");
}

bootstrap();
