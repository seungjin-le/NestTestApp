import configuration from "./configuration";

describe("configuration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns typed default values", () => {
    delete process.env.NODE_ENV;
    delete process.env.PORT;
    delete process.env.DATABASE_PORT;

    expect(configuration()).toMatchObject({
      nodeEnv: "development",
      port: 3000,
      database: {
        port: 5432,
      },
    });
  });

  it("maps environment variables", () => {
    process.env.NODE_ENV = "test";
    process.env.PORT = "4000";
    process.env.JWT_SECRET = "secret";
    process.env.MONGODB_URL = "mongodb://localhost:27017/test";

    expect(configuration()).toMatchObject({
      nodeEnv: "test",
      port: 4000,
      jwt: {
        secret: "secret",
      },
      database: {
        mongodbUrl: "mongodb://localhost:27017/test",
      },
    });
  });
});
