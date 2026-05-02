export default () => ({
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number.parseInt(process.env.PORT ?? "3000", 10),
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: {
    mongodbUrl: process.env.MONGODB_URL,
  },
});
