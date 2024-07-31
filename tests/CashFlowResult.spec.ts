import { test, expect } from "@playwright/test";

test.describe("Cash Flow Results Page", () => {
  test("should display 'Cash Flow Simulation Results' after successful api request with truncated normal distribution", async ({
    page,
  }) => {
    await page.goto(
      "/results/cashflow?periodsPerYear=12&fixedCost=100000&min=5000&mean=12000&max=16000&sd=3496",
    );
    await expect(
      page.getByRole("heading", { name: "Cash Flow Simulation Results" }),
    ).toBeVisible();
  });
  test("should display 'Cash Flow Simulation Results' after successful api request with triangular distribution", async ({
    page,
  }) => {
    await page.goto(
      "/results/cashflow?periodsPerYear=12&fixedCost=100000&min=5000&mean=12000&max=16000&sd=0",
    );
    await expect(
      page.getByRole("heading", { name: "Cash Flow Simulation Results" }),
    ).toBeVisible();
  });
  test("should display 'Cash Flow Simulation Results' after successful api request with normal distribution", async ({
    page,
  }) => {
    await page.goto(
      "/results/cashflow?periodsPerYear=12&fixedCost=100000&min=0&mean=12000&max=0&sd=3496",
    );
    await expect(
      page.getByRole("heading", { name: "Cash Flow Simulation Results" }),
    ).toBeVisible();
  });
  test("should display 'Cash Flow Simulation Results' after successful api request with uniform distribution", async ({
    page,
  }) => {
    await page.goto(
      "/results/cashflow?periodsPerYear=12&fixedCost=100000&min=5000&mean=0&max=16000&sd=0",
    );
    await expect(
      page.getByRole("heading", { name: "Cash Flow Simulation Results" }),
    ).toBeVisible();
  });
});
