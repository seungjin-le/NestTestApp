import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("port") ?? 3000;
  const nodeEnv = process.env.NODE_ENV ?? "development";

  /** @description 공통 글로벌 파이프 설정 */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );


  app.setGlobalPrefix("api");

  /** @description Swagger는 개발/스테이징에서만 활성화 */
  if (nodeEnv !== "production") {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("NestJS 연습용 API Docs")
      .setDescription("NestJS 연습용")
      .setVersion("1.0.0")
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api-docs", app, document);
  }

  // CORS 설정 (기본 허용, 필요 시 origin 제한 가능)
  app.enableCors();

  await app.listen(port, "0.0.0.0");
}

bootstrap();
