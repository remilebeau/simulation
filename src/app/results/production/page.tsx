"use client";
import dynamic from "next/dynamic";
import simulateProduction from "@/lib/simulateProduction";
import { useSearchParams } from "next/navigation";
import ModelInputs from "@/components/ModelInputs";
import SimulationOutputExplanation from "@/components/SimulationOutputExplanation";

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
  const unitCost = searchParams.get("unitCost")!;
  const unitPrice = searchParams.get("unitPrice")!;
  const salvagePrice = searchParams.get("salvagePrice")!;
  const demandMin = searchParams.get("demandMin")!;
  const demandMean = searchParams.get("demandMean")!;
  const demandMax = searchParams.get("demandMax")!;
  const demandSD = searchParams.get("demandSD")!;
  const fixedCost = searchParams.get("fixedCost")!;
  const productionQuantity = searchParams.get("productionQuantity")!;

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
    unitCost,
    unitPrice,
    salvagePrice,
    demandMin,
    demandMean,
    demandMax,
    demandSD,
    fixedCost,
    productionQuantity,
  );
  const inputs: { name: string; value: string }[] = [
    { name: "Unit Cost", value: unitCost },
    { name: "Unit Price", value: unitPrice },
    { name: "Salvage Price", value: salvagePrice },
    { name: "Min Demand", value: demandMin },
    { name: "Mean Demand", value: demandMean },
    { name: "Max Demand", value: demandMax },
    { name: "Demand Standard Deviation", value: demandSD },
    { name: "Fixed Cost", value: fixedCost },
    { name: "Production Quantity", value: productionQuantity },
  ];
  const validatedInputs = inputs.filter(
    (input) => input.value !== null && Number(input.value) > 0,
  );
  return (
    <>
      {simulatedProfits && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-4 p-4">
          <BackButton />
          <h1>Production Simulation Results</h1>
          <ModelInputs inputs={validatedInputs} />
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
          <SimulationOutputExplanation />
          <BackButton />
        </main>
      )}
    </>
  );
}
