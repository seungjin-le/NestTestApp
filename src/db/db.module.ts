import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";

const dbProvider = {
  provide: "PG_CONNECTION",
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => new Pool({
    user: configService.get<string>("database.user"),
    host: configService.get<string>("database.host", "localhost"),
    database: configService.get<string>("database.name"),
    password: configService.get<string>("database.password"),
    port: configService.get<number>("database.port", 5432),
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
