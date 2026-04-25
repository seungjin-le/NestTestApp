import * as bcrypt from "bcrypt";

import { encryptPassword } from "./bcrypt";

describe("encryptPassword", () => {
  it("hashes a password with bcrypt", async () => {
    const password = "password123";
    const hashedPassword = await encryptPassword(password);

    expect(hashedPassword).not.toBe(password);
    await expect(bcrypt.compare(password, hashedPassword)).resolves.toBe(true);
  });
});
