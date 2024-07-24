import { test, expect } from "@playwright/test";

test.describe("Truncated Normal Results Page", () => {
  test("should display 'Truncated Normal Distribution' after successful api request", async ({
    page,
  }) => {
    await page.goto(
      "/results/truncnorm?distMin=10&distMean=20&distMax=30&distSD=4",
    );
    await expect(
      page.getByRole("heading", { name: "Truncated Normal Distribution" }),
    ).toBeVisible();
  });
});
