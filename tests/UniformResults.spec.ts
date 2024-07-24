import { test, expect } from "@playwright/test";

test.describe("Uniform Results Page", () => {
  test("should display 'Uniform Distribution' after successful api request", async ({
    page,
  }) => {
    await page.goto("/results/uniform?distMin=10&distMax=30");
    await expect(
      page.getByRole("heading", { name: "Uniform Distribution" }),
    ).toBeVisible();
  });
});
