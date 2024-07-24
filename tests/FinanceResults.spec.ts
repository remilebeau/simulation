import { test, expect } from "@playwright/test";

test.describe("Finance Results Page", () => {
  test("should display 'Finance Simulation Results' after successful api request with all required and optional params", async ({
    page,
  }) => {
    await page.goto(
      "/results/finance?fixedCost=700000000&yearOneMargin=4000&yearOneSalesMin=50000&yearOneSalesMode=75000&yearOneSalesMax=85000&annualMarginDecrease=0.04&annualSalesDecayMin=0.05&annualSalesDecayMode=0.08&annualSalesDecayMax=0.10&taxRate=0.4&discountRate=0.1",
    );
    await expect(
      page.getByRole("heading", { name: "Finance Simulation Results" }),
    ).toBeVisible();
  });
  test("should display 'Finance Simulation Results' after successful api request with no optional params", async ({
    page,
  }) => {
    await page.goto(
      "/results/finance?fixedCost=700000000&yearOneMargin=4000&yearOneSalesMin=50000&yearOneSalesMode=75000&yearOneSalesMax=85000&annualMarginDecrease=0&annualSalesDecayMin=0&annualSalesDecayMode=0&annualSalesDecayMax=0&taxRate=0&discountRate=0",
    );
    await expect(
      page.getByRole("heading", { name: "Finance Simulation Results" }),
    ).toBeVisible();
  });
});
