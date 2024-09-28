"use client";
import dynamic from "next/dynamic";
import simulateProduction from "@/lib/simulateProduction";
import { useSearchParams } from "next/navigation";
import ModelInputs from "@/components/ModelInputs";
import BackButton from "@/components/BackButton";

export default async function ProductionResults() {
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
    valueAtRisk,
    q1,
    mean,
    median,
    q3,
    maximum,
    pLoseMoney,
    simulatedProfits,
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
          <ModelInputs
            unitCost={unitCost}
            unitPrice={unitPrice}
            salvagePrice={salvagePrice}
            demandMin={demandMin}
            demandMean={demandMean}
            demandMax={demandMax}
            demandSD={demandSD}
            fixedCost={fixedCost}
            productionQuantity={productionQuantity}
          />
          <Histogram values={simulatedProfits} />
          <SimStats
            minimum={minimum}
            valueAtRisk={valueAtRisk}
            q1={q1}
            mean={mean}
            median={median}
            q3={q3}
            maximum={maximum}
            pLoseMoney={pLoseMoney}
          />
          <BackButton />
        </main>
      )}
    </>
  );
}
