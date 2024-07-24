"use client";
import dynamic from "next/dynamic";
import simulateFinance from "@/lib/simulateFinance";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ModelInputs from "@/components/ModelInputs";

export default async function FinanceResults() {
  // client component imports
  const Histogram = dynamic(() => import("@/components/Histogram"), {
    ssr: false,
  });
  const SimStats = dynamic(() => import("@/components/SimStats"), {
    ssr: false,
  });
  const BackButton = dynamic(() => import("@/components/BackButton"), {
    ssr: false,
  });
  const searchParams = useSearchParams();

  // get query params
  const fixedCost = searchParams.get("fixedCost");
  const yearOneMargin = searchParams.get("yearOneMargin");
  const yearOneSalesMin = searchParams.get("yearOneSalesMin");
  const yearOneSalesMode = searchParams.get("yearOneSalesMode");
  const yearOneSalesMax = searchParams.get("yearOneSalesMax");
  const annualMarginDecrease = searchParams.get("annualMarginDecrease");
  const annualSalesDecayMin = searchParams.get("annualSalesDecayMin");
  const annualSalesDecayMode = searchParams.get("annualSalesDecayMode");
  const annualSalesDecayMax = searchParams.get("annualSalesDecayMax");
  const taxRate = searchParams.get("taxRate");
  const discountRate = searchParams.get("discountRate");

  const {
    simulatedNPVs,
    meanNPV,
    meanStandardError,
    meanLowerCI,
    meanUpperCI,
    pLoseMoneyLowerCI,
    pLoseMoneyUpperCI,
    valueAtRisk,
  } = await simulateFinance(
    fixedCost!,
    yearOneMargin!,
    yearOneSalesMin!,
    yearOneSalesMode!,
    yearOneSalesMax!,
    annualMarginDecrease!,
    annualSalesDecayMin!,
    annualSalesDecayMode!,
    annualSalesDecayMax!,
    taxRate!,
    discountRate!,
  );
  const inputs = [
    {
      name: "Fixed Cost",
      value: fixedCost!,
    },
    {
      name: "Year One Margin",
      value: yearOneMargin!,
    },
    {
      name: "Year One Sales Min",
      value: yearOneSalesMin!,
    },
    {
      name: "Year One Sales Mode",
      value: yearOneSalesMode!,
    },
    {
      name: "Year One Sales Max",
      value: yearOneSalesMax!,
    },
    {
      name: "Annual Margin Decrease",
      value: annualMarginDecrease!,
    },
    {
      name: "Annual Sales Decay Min",
      value: annualSalesDecayMin!,
    },
    {
      name: "Annual Sales Decay Mode",
      value: annualSalesDecayMode!,
    },
    {
      name: "Annual Sales Decay Max",
      value: annualSalesDecayMax!,
    },
    {
      name: "Tax Rate",
      value: taxRate!,
    },
    {
      name: "Discount Rate",
      value: discountRate!,
    },
  ];
  return (
    <>
      {simulatedNPVs && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Finance Simulation Results</h1>
          <ModelInputs inputs={inputs} />
          <Histogram values={simulatedNPVs} />
          <SimStats
            meanProfit={meanNPV}
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
