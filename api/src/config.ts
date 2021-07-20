import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

config();

const {
  DB_TYPE,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_LOG_LEVEL,
  DB_HOST,
  JWT_SECRET,
} = process.env;

export class Config {
  static dbType = DB_TYPE;
  static dbPort = Number(DB_PORT);
  static dbUsername = DB_USERNAME;
  static dbPassword = DB_PASSWORD;
  static dbName = DB_NAME;
  static dbLogLevel = DB_LOG_LEVEL ?? 'all';
  static dbHost = DB_HOST;
  static jwtSecret = JWT_SECRET;

  static typeOrmConfig: TypeOrmModuleOptions = {
    type: Config.dbType,
    host: Config.dbHost,
    port: Config.dbPort,
    username: Config.dbUsername,
    password: Config.dbPassword,
    database: Config.dbName,
    autoLoadEntities: true,
    logging: Config.dbLogLevel,
    synchronize: true,
  } as TypeOrmModuleOptions;
}

export const aShowConfig = () => {
  console.log(Config);
};
