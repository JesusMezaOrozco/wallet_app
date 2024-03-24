import { cashFormater } from "@/utils/formaters";
import { describe, expect, it } from "vitest";

describe("formatter", () => {
  it("should format string in a currency correct format", () => {
    const cash = "1000";
    expect(cashFormater(cash, "usd")).toEqual("$1,000.00");
  });
});
