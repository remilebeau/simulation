"use client";
import dynamic from "next/dynamic";
import simulateFinance from "@/lib/simulateFinance";
import { useRouter, useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ResultsHeader from "@/components/ResultsHeader";

export default async function FinanceResults() {
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
  const fixedCost = searchParams.get("fixedCost");
  const demandMin = searchParams.get("demandMin");
  const demandMode = searchParams.get("demandMode");
  const demandMax = searchParams.get("demandMax");
  const yearOneMargin = searchParams.get("yearOneMargin");
  const annualMarginDecrease = searchParams.get("annualMarginDecrease");
  const taxRate = searchParams.get("taxRate");
  const discountRate = searchParams.get("discountRate");
  const demandDecayMin = searchParams.get("demandDecayMin");
  const demandDecayMode = searchParams.get("demandDecayMode");
  const demandDecayMax = searchParams.get("demandDecayMax");

  // validate query params
  if (
    !(
      fixedCost &&
      demandMin &&
      demandMode &&
      demandMax &&
      yearOneMargin &&
      annualMarginDecrease &&
      taxRate &&
      discountRate &&
      demandDecayMin &&
      demandDecayMode &&
      demandDecayMax
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
  } = await simulateFinance(
    fixedCost!,
    demandMin!,
    demandMode!,
    demandMax!,
    yearOneMargin!,
    annualMarginDecrease!,
    taxRate!,
    discountRate!,
    demandDecayMin!,
    demandDecayMode!,
    demandDecayMax!,
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
