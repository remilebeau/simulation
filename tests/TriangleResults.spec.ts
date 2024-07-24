import { test, expect } from "@playwright/test";

test.describe("Triangular Distribution Page", () => {
  test("should display 'Triangular Distribution' after successful api request", async ({
    page,
  }) => {
    await page.goto("/results/triangular?distMin=10&distMode=20&distMax=30");
    await expect(
      page.getByRole("heading", { name: "Triangular Distribution" }),
    ).toBeVisible();
  });
});
