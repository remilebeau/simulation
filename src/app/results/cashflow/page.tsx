"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ModelInputs from "@/components/ModelInputs";
import simulateCashFlow from "@/lib/simulateCashFlow";

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
  const periodsPerYear = searchParams.get("periodsPerYear");
  const min = searchParams.get("min");
  const mean = searchParams.get("mean");
  const max = searchParams.get("max");
  const sd = searchParams.get("sd");

  const { annualCashFlows } = await simulateCashFlow(
    periodsPerYear!,
    min!,
    mean!,
    max!,
    sd!,
  );
  const inputs = [
    {
      name: "Min",
      value: min!,
    },
    {
      name: "Mean",
      value: mean!,
    },
    {
      name: "Max",
      value: max!,
    },
    {
      name: "Standard Deviation",
      value: sd!,
    },
  ];
  return (
    <>
      {annualCashFlows && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Cash Flow Simulation Results</h1>
          <ModelInputs inputs={inputs} />
          <Histogram values={annualCashFlows} />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
