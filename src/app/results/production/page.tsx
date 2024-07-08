"use client";
import dynamic from "next/dynamic";
import simulateProduction from "@/lib/simulateProduction";
import { useRouter, useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import Histogram from "@/components/Histogram";

export default async function ProductionResults() {
  // client component imports
  const SimStats = dynamic(() => import("@/components/SimStats"), {
    ssr: false,
  });
  const BackButton = dynamic(() => import("@/components/BackButton"), {
    ssr: false,
  });
  const router = useRouter();
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

  // validate query params
  if (
    !(
      fixedCost &&
      demandMin &&
      demandMode &&
      demandMax &&
      unitCost &&
      unitPrice &&
      salvagePrice &&
      productionQuantity
    )
  ) {
    router.push("/");
  }

  const {
    simValues,
    meanProfit,
    lowerCI,
    upperCI,
    minProfit,
    maxProfit,
    q1,
    q2,
    q3,
    pLoseMoneyLowerCI,
    pLoseMoneyUpperCI,
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
      {simValues && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1>Production Simulation Results</h1>
          <h2>Unit Cost = {unitCost}</h2> <h2>Unit Price = {unitPrice}</h2>
          <h2>Salvage Price = {salvagePrice}</h2>
          <h2>
            Demand = [{demandMin}, {demandMode}, {demandMax}]
          </h2>
          <h2>Fixed Cost = {fixedCost}</h2>
          <Histogram simValues={simValues} />
          <SimStats
            minProfit={minProfit}
            maxProfit={maxProfit}
            meanProfit={meanProfit}
            lowerCI={lowerCI}
            upperCI={upperCI}
            q1={q1}
            q2={q2}
            q3={q3}
            pLoseMoneyLowerCI={pLoseMoneyLowerCI}
            pLoseMoneyUpperCI={pLoseMoneyUpperCI}
          />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
