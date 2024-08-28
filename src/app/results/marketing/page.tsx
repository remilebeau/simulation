"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ModelInputs from "@/components/ModelInputs";
import simulateMarketing from "@/lib/simulateMarketing";

export default async function MarketingResults() {
  // client component imports
  const BackButton = dynamic(() => import("@/components/BackButton"), {
    ssr: false,
  });
  const searchParams = useSearchParams();

  // get query params
  const retentionRate = searchParams.get("retentionRate")!;
  const discountRate = searchParams.get("discountRate")!;
  const stDev = searchParams.get("stDev")!;
  const yearOneMeanProfit = searchParams.get("yearOneMeanProfit")!;
  const yearTwoMeanProfit = searchParams.get("yearTwoMeanProfit")!;
  const yearThreeMeanProfit = searchParams.get("yearThreeMeanProfit")!;
  const yearFourMeanProfit = searchParams.get("yearFourMeanProfit")!;
  const yearFiveMeanProfit = searchParams.get("yearFiveMeanProfit")!;

  const { meanNPV, meanYearsLoyal } = await simulateMarketing(
    retentionRate,
    discountRate,
    stDev,
    yearOneMeanProfit,
    yearTwoMeanProfit,
    yearThreeMeanProfit,
    yearFourMeanProfit,
    yearFiveMeanProfit,
  );
  const inputs: { name: string; value: string }[] = [
    {
      name: "Retention Rate",
      value: retentionRate,
    },
    {
      name: "Discount Rate",
      value: discountRate,
    },
    {
      name: "stDev",
      value: stDev,
    },
    {
      name: "Year One Mean Profit",
      value: yearOneMeanProfit,
    },
    {
      name: "Year Two Mean Profit",
      value: yearTwoMeanProfit,
    },
    {
      name: "Year Three Mean Profit",
      value: yearThreeMeanProfit,
    },
    {
      name: "Year Four Mean Profit",
      value: yearFourMeanProfit,
    },
    {
      name: "Year Five Mean Profit",
      value: yearFiveMeanProfit,
    },
  ];
  const validatedInputs = inputs.filter(
    (input) => input.value !== null && Number(input.value) !== 0,
  );

  return (
    <>
      {meanNPV && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-4 p-4">
          <BackButton />
          <h1>Marketing Simulation Results</h1>
          <ModelInputs inputs={validatedInputs} />
          <section className="flex flex-col gap-4">
            <p>
              Mean NPV:{" "}
              {meanNPV.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
            </p>
            <p>Mean Years Loyal: {meanYearsLoyal}</p>
          </section>
          <BackButton />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
