"use client";
import dynamic from "next/dynamic";
import simulateProduction from "@/lib/simulateProduction";
import { useSearchParams } from "next/navigation";
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

  return (
    <>
      {simulatedProfits && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-4 p-4">
          <BackButton />
          <h1 className="text-xl font-bold sm:text-2xl">
            Production Simulation Results
          </h1>
          {/* MODEL INPUTS SECTION */}
          <ul className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
            <li>
              <b>Unit Cost:</b> {Number(unitCost).toLocaleString("en-US")}
            </li>
            <li>
              <b>Unit Price:</b> {Number(unitPrice).toLocaleString("en-US")}
            </li>
            <li>
              <b>Salvage Price:</b>{" "}
              {Number(salvagePrice).toLocaleString("en-US")}
            </li>
            <li>
              <b>Min Demand:</b> {Number(demandMin).toLocaleString("en-US")}
            </li>
            <li>
              <b>Mean Demand:</b> {Number(demandMean).toLocaleString("en-US")}
            </li>
            <li>
              <b>Max Demand:</b> {Number(demandMax).toLocaleString("en-US")}
            </li>
            <li>
              <b>Demand Standard Deviation:</b>{" "}
              {Number(demandSD).toLocaleString("en-US")}
            </li>
            <li>
              <b>Fixed Cost:</b> {Number(fixedCost).toLocaleString("en-US")}
            </li>
            <li>
              <b>Production Quantity:</b>{" "}
              {Number(productionQuantity).toLocaleString("en-US")}
            </li>
          </ul>
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
