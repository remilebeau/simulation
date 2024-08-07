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
  const unitCost = searchParams.get("unitCost")!;
  const unitPrice = searchParams.get("unitPrice")!;
  const salvagePrice = searchParams.get("salvagePrice")!;
  const demandMin = searchParams.get("demandMin")!;
  const demandMode = searchParams.get("demandMode")!;
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
    demandMode,
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
    { name: "Mean Demand", value: demandMode },
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
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Production Simulation Results</h1>
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
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
