"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ModelInputs from "@/components/ModelInputs";
import simulateCashFlow from "@/lib/simulateCashFlow";
import { determineDistribution } from "@/lib/validation";
import SimStats from "@/components/SimStats";
import SimulationOutputExplanation from "@/components/SimulationOutputExplanation";

export default async function CashFlowResults() {
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
      name: "Total Fixed Costs",
      value: fixedCost,
    },
    {
      name: "Minimum Periodic Cash Flow",
      value: min,
    },
    {
      name: "Mean Periodic Cash Flow",
      value: mean,
    },
    {
      name: "Maximum Periodic Cash Flow",
      value: max,
    },
    {
      name: "Standard Deviation of Periodic Cash Flows",
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
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-4 p-4">
          <BackButton />
          <h1>Cash Flow Simulation Results</h1>
          <h2>Distribution: {distribution?.toUpperCase()}</h2>
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
          <SimulationOutputExplanation />
          <BackButton />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
