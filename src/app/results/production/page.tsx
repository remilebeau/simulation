"use client";
import dynamic from "next/dynamic";
import simulateProduction from "@/lib/simulateProduction";
import { useRouter, useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ResultsHeader from "@/components/ResultsHeader";

export default async function ProductionResults() {
  // client component imports
  const SimPlot = dynamic(() => import("@/components/SimPlot"), {
    ssr: false,
  });
  const SimStats = dynamic(() => import("@/components/SimStats"), {
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
          <ResultsHeader />
          <SimPlot simValues={simValues} />
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