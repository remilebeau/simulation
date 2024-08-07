"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ModelInputs from "@/components/ModelInputs";
import simulateCashFlow from "@/lib/simulateCashFlow";
import { determineDistribution } from "@/lib/validation";
import SimStats from "@/components/SimStats";

export default async function FinanceResults() {
  // client component imports
  const Histogram = dynamic(() => import("@/components/Histogram"), {
    ssr: false,
  });
  const BackButton = dynamic(() => import("@/components/BackButton"), {
    ssr: false,
  });
  const searchParams = useSearchParams();

  // get query params
  const periodsPerYear = searchParams.get("periodsPerYear")!;
  const fixedCost = searchParams.get("fixedCost")!;
  const min = searchParams.get("min")!;
  const mean = searchParams.get("mean")!;
  const max = searchParams.get("max")!;
  const sd = searchParams.get("sd")!;

  const {
    annualCashFlows,
    meanProfit,
    meanStandardError,
    meanLowerCI,
    meanUpperCI,
    pLoseMoneyLowerCI,
    pLoseMoneyUpperCI,
    valueAtRisk,
  } = await simulateCashFlow(periodsPerYear, fixedCost, min, mean, max, sd);
  const inputs: { name: string; value: string }[] = [
    {
      name: "Periods per Year",
      value: periodsPerYear,
    },
    {
      name: "Total Annual Fixed Cost",
      value: fixedCost,
    },
    {
      name: "Min Periodic Cash Flow",
      value: min,
    },
    {
      name: "Expected Periodic Cash Flow",
      value: mean,
    },
    {
      name: "Max Periodic Cash Flow",
      value: max,
    },
    {
      name: "Standard Deviation",
      value: sd,
    },
  ];
  const validatedInputs = inputs.filter(
    (input) => input.value !== null && Number(input.value) > 0,
  );
  const distribution = determineDistribution(
    Number(min),
    Number(mean),
    Number(max),
    Number(sd),
  );
  return (
    <>
      {annualCashFlows && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Cash Flow Simulation Results</h1>
          <h2 className="text-2xl font-bold">
            Distribution: {distribution?.toUpperCase()}
          </h2>
          <ModelInputs inputs={validatedInputs} />
          <Histogram values={annualCashFlows} />
          <SimStats
            meanProfit={meanProfit}
            meanStandardError={meanStandardError}
            meanLowerCI={meanLowerCI}
            meanUpperCI={meanUpperCI}
            pLoseMoneyLowerCI={pLoseMoneyLowerCI}
            pLoseMoneyUpperCI={pLoseMoneyUpperCI}
            valueAtRisk={valueAtRisk}
          />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
