import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터가 없는 속성들은 제거
      forbidNonWhitelisted: true, // 데코레이터가 없는 속성이 있으면 요청 자체를 막음
      transform: true, // 유저가 보낸 데이터를 우리가 원하는 타입으로 변환
    })
  );
  await app.listen(3000);
}
bootstrap();
