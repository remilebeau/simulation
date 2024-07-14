"use client";
import dynamic from "next/dynamic";
import simulateProduction from "@/lib/simulateProduction";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";

export default async function ProductionResults() {
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
  const unitCost = searchParams.get("unitCost");
  const unitPrice = searchParams.get("unitPrice");
  const salvagePrice = searchParams.get("salvagePrice");
  const demandMin = searchParams.get("demandMin");
  const demandMode = searchParams.get("demandMode");
  const demandMax = searchParams.get("demandMax");
  const fixedCost = searchParams.get("fixedCost");
  const productionQuantity = searchParams.get("productionQuantity");

  const {
    simulatedProfits,
    meanProfit,
    meanStandardError,
    meanLowerCI,
    meanUpperCI,
    pLoseMoneyLowerCI,
    pLoseMoneyUpperCI,
    valueAtRisk,
  } = await simulateProduction(
    unitCost!,
    unitPrice!,
    salvagePrice!,
    demandMin!,
    demandMode!,
    demandMax!,
    fixedCost!,
    productionQuantity!,
  );
  return (
    <>
      {simulatedProfits && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Production Simulation Results</h1>
          {/* display formatted inputs */}
          <section className="grid grid-cols-2 gap-4 p-4 text-left">
            <p className="text-2xl font-bold">
              Unit Cost: {Number(unitCost!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Unit Price: {Number(unitPrice!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Salvage Price: {Number(salvagePrice!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Fixed Cost: {Number(fixedCost!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Demand Min: {Number(demandMin!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Demand Mode: {Number(demandMode!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Demand Max: {Number(demandMax!).toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Production Quantity:{" "}
              {Number(productionQuantity!).toLocaleString("en-US")}
            </p>
          </section>

          <Histogram values={simulatedProfits} />
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
