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
          <h1 className="text-3xl font-bold">Finance Simulation Results</h1>
          {/* display formatted inputs */}
          <section className="grid grid-cols-2 gap-4 p-4 text-left text-2xl font-bold">
            <p>
              Fixed Cost:{" "}
              {Number(fixedCost!).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}
            </p>
            <p>
              Year One Margin:{" "}
              {Number(yearOneMargin!).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}
            </p>
            <p>
              Year One Sales Min:{" "}
              {Number(yearOneSalesMin!).toLocaleString("en-US")}
            </p>
            <p>
              Year One Sales Mode:{" "}
              {Number(yearOneSalesMode!).toLocaleString("en-US")}
            </p>
            <p>
              Year One Sales Max:{" "}
              {Number(yearOneSalesMax!).toLocaleString("en-US")}
            </p>
            <p>
              Annual Margin Decrease:{" "}
              {Number(annualMarginDecrease).toLocaleString("en-US", {
                style: "percent",
              })}
            </p>
            <p>
              Annual Sales Decay Min:{" "}
              {Number(annualSalesDecayMin).toLocaleString("en-US", {
                style: "percent",
              })}
            </p>
            <p>
              Annual Sales Decay Mode:{" "}
              {Number(annualSalesDecayMode).toLocaleString("en-US", {
                style: "percent",
              })}
            </p>
            <p>
              Annual Sales Decay Max:{" "}
              {Number(annualSalesDecayMax).toLocaleString("en-US", {
                style: "percent",
              })}
            </p>
            <p>
              Tax Rate:{" "}
              {Number(taxRate).toLocaleString("en-US", {
                style: "percent",
              })}
            </p>
            <p>
              Discount Rate:{" "}
              {Number(discountRate).toLocaleString("en-US", {
                style: "percent",
              })}
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
