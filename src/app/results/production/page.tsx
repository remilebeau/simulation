"use client";
import dynamic from "next/dynamic";
import simulateProduction from "@/lib/simulateProduction";
import { useRouter, useSearchParams } from "next/navigation";
import SimulationOutputExplanation from "@/components/SimulationOutputExplanation";

export default async function ProductionResults() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // client component imports
  const Histogram = dynamic(() => import("@/components/Histogram"), {
    ssr: false,
  });
  const SimStats = dynamic(() => import("@/components/SimStats"), {
    ssr: false,
  });

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
    minimum,
    q1,
    median,
    q3,
    maximum,
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
          {/* BACK BUTTON */}
          <button
            className="w-full rounded-xl bg-teal-700 text-3xl font-bold transition-all duration-300 ease-in-out hover:bg-black"
            onClick={() => router.push("/")}
          >
            Go Back
          </button>
          <h1 className="text-xl font-bold sm:text-2xl">
            Production Simulation Results
          </h1>
          {/* MODEL INPUTS SECTION */}
          <ul className="flex flex-col gap-4 rounded-md border border-white p-4 sm:grid sm:grid-cols-2">
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
              <b>Fixed Cost:</b> {Number(fixedCost).toLocaleString("en-US")}
            </li>
            <li>
              <b>Production Quantity:</b>{" "}
              {Number(productionQuantity).toLocaleString("en-US")}
            </li>
            {demandMin !== "0" && (
              <li>
                <b>Min Demand:</b> {Number(demandMin).toLocaleString("en-US")}
              </li>
            )}
            {demandMean !== "0" && (
              <li>
                <b>Mean Demand:</b> {Number(demandMean).toLocaleString("en-US")}
              </li>
            )}
            {demandMax !== "0" && (
              <li>
                <b>Max Demand:</b> {Number(demandMax).toLocaleString("en-US")}
              </li>
            )}
            {demandSD !== "0" && (
              <li>
                <b>Demand Standard Deviation:</b>{" "}
                {Number(demandSD).toLocaleString("en-US")}
              </li>
            )}
          </ul>
          <Histogram values={simulatedProfits} />
          <SimStats
            minimum={minimum}
            q1={q1}
            median={median}
            q3={q3}
            maximum={maximum}
            meanProfit={meanProfit}
            meanStandardError={meanStandardError}
            meanLowerCI={meanLowerCI}
            meanUpperCI={meanUpperCI}
            pLoseMoneyLowerCI={pLoseMoneyLowerCI}
            pLoseMoneyUpperCI={pLoseMoneyUpperCI}
            valueAtRisk={valueAtRisk}
          />
          <SimulationOutputExplanation />
          {/* BACK BUTTON */}
          <button
            className="w-full rounded-xl bg-teal-700 text-3xl font-bold transition-all duration-300 ease-in-out hover:bg-black"
            onClick={() => router.push("/")}
          >
            Go Back
          </button>
        </main>
      )}
    </>
  );
}
