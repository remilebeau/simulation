"use client";
import dynamic from "next/dynamic";
import simulateProduction from "@/lib/simulateProduction";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();

  // get query params
  const unitCost = Number(searchParams.get("unitCost")) || undefined;
  const unitPrice = Number(searchParams.get("unitPrice")) || undefined;
  const salvagePrice = Number(searchParams.get("salvagePrice")) || undefined;
  const demandMin = Number(searchParams.get("demandMin")) || undefined;
  const demandMode = Number(searchParams.get("demandMode")) || undefined;
  const demandMax = Number(searchParams.get("demandMax")) || undefined;
  const fixedCost = Number(searchParams.get("fixedCost")) || undefined;
  const productionQuantity =
    Number(searchParams.get("productionQuantity")) || undefined;

  // validate query params
  if (
    unitCost === undefined ||
    unitPrice === undefined ||
    salvagePrice === undefined ||
    demandMin === undefined ||
    demandMode === undefined ||
    demandMax === undefined ||
    fixedCost === undefined ||
    productionQuantity === undefined
  ) {
    router.push("/");
  }

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
              Unit Cost: {unitCost?.toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Unit Price: {unitPrice?.toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Salvage Price: {salvagePrice?.toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Fixed Cost: {fixedCost?.toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Demand Min: {demandMin?.toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Demand Mode: {demandMode?.toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Demand Max: {demandMax?.toLocaleString("en-US")}
            </p>
            <p className="text-2xl font-bold">
              Production Quantity: {productionQuantity?.toLocaleString("en-US")}
            </p>
          </section>

          <Histogram simulatedProfits={simulatedProfits} />
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
