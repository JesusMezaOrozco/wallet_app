import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Input from "@/components/Input";

describe("Input", async () => {
  it("Should render correctly", async () => {
    render(<Input />);
  });
  it("Should receive user inputs", () => {
    render(<Input />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "hello" },
    });
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    console.log(inputElement);
    expect(inputElement.value).toBe("hello");
  });
});
