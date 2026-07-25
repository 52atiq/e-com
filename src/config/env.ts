import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT),

  nodeEnv: process.env.NODE_ENV as string,

  dbHost: process.env.DB_HOST as string,

  dbPort: Number(process.env.DB_PORT),

  dbName: process.env.DB_NAME as string,

  dbUser: process.env.DB_USER as string,

  dbPassword: process.env.DB_PASSWORD as string,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET as string,

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,

  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,

  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
};
