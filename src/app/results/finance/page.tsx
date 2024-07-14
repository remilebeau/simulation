"use client";
import dynamic from "next/dynamic";
import simulateFinance from "@/lib/simulateFinance";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";

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
  return (
    <>
      {simulatedNPVs && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Production Simulation Results</h1>
          {/* display formatted inputs */}
          <section className="grid grid-cols-2 gap-4 p-4 text-left">
            <p className="text-2xl font-bold">
              Fixed Cost: {Number(fixedCost!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Year One Margin: {Number(yearOneMargin!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Year One Sales Min:{" "}
              {Number(yearOneSalesMin!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Year One Sales Mode:{" "}
              {Number(yearOneSalesMode!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Year One Sales Max:{" "}
              {Number(yearOneSalesMax!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Annual Margin Decrease:{" "}
              {Number(annualMarginDecrease).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Annual Sales Decay Min:{" "}
              {Number(annualSalesDecayMin).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Annual Sales Decay Mode:{" "}
              {Number(annualSalesDecayMode).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Annual Sales Decay Max:{" "}
              {Number(annualSalesDecayMax).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Tax Rate: {Number(taxRate).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Discount Rate: {Number(discountRate).toLocaleString("en-US")}
            </p>
          </section>

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
