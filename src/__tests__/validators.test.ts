import { formatInputValidator } from "@/utils/validators";
import { describe, expect, it } from "vitest";
describe("validator", () => {
  it("should verify email format", () => {
    const email = "jemezor@hotmail.com";
    expect(formatInputValidator(email, "email")).toBe(true);
  });
  it("should verify password length more than 4 characters", () => {
    const password = "5645asdas!@#";
    expect(formatInputValidator(password, "password")).toBe(true);
  });
});
