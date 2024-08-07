import { test, expect } from "@playwright/test";

test.describe("Production Results Page", () => {
  test("should display 'Production Simulation Results' after successful api request with truncated normal distribution", async ({
    page,
  }) => {
    await page.goto(
      "/results/production?unitCost=80&unitPrice=100&salvagePrice=30&demandMin=5000&demandMode=12000&demandMax=16000&demandSD=3496&fixedCost=100000&productionQuantity=7800",
    );
    await expect(
      page.getByRole("heading", { name: "Production Simulation Results" }),
    ).toBeVisible();
  });
  test("should display 'Production Simulation Results' after successful api request with triangular distribution", async ({
    page,
  }) => {
    await page.goto(
      "/results/production?unitCost=80&unitPrice=100&salvagePrice=30&demandMin=5000&demandMode=12000&demandMax=16000&demandSD=0&fixedCost=100000&productionQuantity=7800",
    );
    await expect(
      page.getByRole("heading", { name: "Production Simulation Results" }),
    ).toBeVisible();
  });
  test("should display 'Production Simulation Results' after successful api request with normal distribution", async ({
    page,
  }) => {
    await page.goto(
      "/results/production?unitCost=80&unitPrice=100&salvagePrice=30&demandMin=0&demandMode=12000&demandMax=0&demandSD=3496&fixedCost=100000&productionQuantity=7800",
    );
    await expect(
      page.getByRole("heading", { name: "Production Simulation Results" }),
    ).toBeVisible();
  });
  test("should display 'Production Simulation Results' after successful api request with uniform distribution", async ({
    page,
  }) => {
    await page.goto(
      "/results/production?unitCost=80&unitPrice=100&salvagePrice=30&demandMin=5000&demandMode=0&demandMax=16000&demandSD=0&fixedCost=100000&productionQuantity=7800",
    );
    await expect(
      page.getByRole("heading", { name: "Production Simulation Results" }),
    ).toBeVisible();
  });
});
