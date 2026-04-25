export default () => ({
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number.parseInt(process.env.PORT ?? "3000", 10),
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT ?? "5432", 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    mongodbUrl: process.env.MONGODB_URL,
  },
});
