import * as bcrypt from "bcrypt";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  const payload = { email: "user@example.com", sub: 1 };
  const tokenPair = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
  };

  const createService = () => {
    const usersService = {
      findByEmail: jest.fn().mockResolvedValue({
        id: payload.sub,
        email: payload.email,
        password: "hashed-password",
      }),
    };
    const jwtService = {
      sign: jest.fn().mockImplementation((_payload, options) => {
        return options.expiresIn === "1h" ? tokenPair.accessToken : tokenPair.refreshToken;
      }),
      signAsync: jest.fn(),
      verify: jest.fn().mockReturnValue(payload),
    };
    const authModel = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      updateOne: jest.fn().mockResolvedValue({ acknowledged: true }),
    };

    return {
      service: new AuthService(usersService as never, jwtService as never, authModel as never),
      usersService,
      jwtService,
      authModel,
    };
  };

  beforeEach(() => {
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("creates login tokens through the shared token helpers", async () => {
    const { service, jwtService, authModel } = createService();

    const result = await service.postLogin({
      email: payload.email,
      password: "password",
    });

    expect(jwtService.sign).toHaveBeenCalledWith(payload, { expiresIn: "1h" });
    expect(jwtService.sign).toHaveBeenCalledWith(payload, { expiresIn: "7d" });
    expect(jwtService.signAsync).not.toHaveBeenCalled();
    expect(authModel.updateOne).toHaveBeenCalledWith(
      { email: payload.email },
      { $set: tokenPair },
      { upsert: true }
    );
    expect(result).toEqual({
      status: 200,
      message: "로그인 성공",
      data: tokenPair,
    });
  });

  it("keeps the refresh response shape while reissuing a token pair", async () => {
    const { service, jwtService, authModel } = createService();

    const result = await service.postRefresh({
      accessToken: "old-access-token",
      refreshToken: tokenPair.refreshToken,
    });

    expect(jwtService.verify).toHaveBeenCalledWith(tokenPair.refreshToken);
    expect(authModel.updateOne).toHaveBeenCalledWith(
      { email: payload.email },
      { $set: tokenPair },
      { upsert: true }
    );
    expect(result).toEqual({
      status: 200,
      message: "토큰 갱신 성공",
      data: tokenPair,
    });
  });
});
