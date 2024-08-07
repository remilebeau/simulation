"use client";
import dynamic from "next/dynamic";
import simulateProduction from "@/lib/simulateProduction";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ModelInputs from "@/components/ModelInputs";

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
  const demandSD = searchParams.get("demandSD");
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
    demandSD!,
    fixedCost!,
    productionQuantity!,
  );
  let inputs = [];
  if (unitCost && Number(unitCost) > 0) {
    inputs.push({ name: "Unit Cost", value: unitCost });
  }
  if (unitPrice && Number(unitPrice) > 0) {
    inputs.push({ name: "Unit Price", value: unitPrice });
  }
  if (salvagePrice && Number(salvagePrice) > 0) {
    inputs.push({ name: "Salvage Price", value: salvagePrice });
  }
  if (demandMin && Number(demandMin) > 0) {
    inputs.push({ name: "Min Demand", value: demandMin });
  }
  if (demandMode && Number(demandMode) > 0) {
    inputs.push({ name: "Mean Demand", value: demandMode });
  }
  if (demandMax && Number(demandMax) > 0) {
    inputs.push({ name: "Max Demand", value: demandMax });
  }
  if (demandSD && Number(demandSD) > 0) {
    inputs.push({ name: "Demand Standard Deviation", value: demandSD });
  }
  if (fixedCost && Number(fixedCost) > 0) {
    inputs.push({ name: "Fixed Cost", value: fixedCost });
  }
  if (productionQuantity && Number(productionQuantity) > 0) {
    inputs.push({ name: "Production Quantity", value: productionQuantity });
  }
  return (
    <>
      {simulatedProfits && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Production Simulation Results</h1>
          <ModelInputs inputs={inputs} />
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
