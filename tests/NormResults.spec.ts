import { test, expect } from "@playwright/test";

test.describe("Normal Results Page", () => {
  test("should display 'Normal Distribution' after successful api request", async ({
    page,
  }) => {
    await page.goto("/results/normal?distMean=10&distSD=5");
    await expect(
      page.getByRole("heading", { name: "Normal Distribution" }),
    ).toBeVisible();
  });
});
