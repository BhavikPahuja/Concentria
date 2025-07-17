declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "production" | "development" | "docker";
    PORT: string;
    DB_HOST: string;
    DB_USER: string;
    DB_NAME: string;
    DB_PASS: string;
    EMAIL: string;
    EMAIL_PASSWORD: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    ACCESS_TOKEN_EXPIRE_TIME: string;
    REFRESH_TOKEN_EXPIRE_TIME: string;
    REDIS_CLIENT_HOST: string;
    REDIS_CLIENT_PORT: string;
  }
}
