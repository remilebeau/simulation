"use client";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import simulateFinance from "@/lib/simulateFinance";
import { useRouter, useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";

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
  const fixedCost = Number(searchParams.get("fixedCost"));
  const demandMin = Number(searchParams.get("demandMin"));
  const demandMode = Number(searchParams.get("demandMode"));
  const demandMax = Number(searchParams.get("demandMax"));
  const yearOneMargin = Number(searchParams.get("yearOneMargin"));
  const annualMarginDecrease = Number(searchParams.get("annualMarginDecrease"));
  const taxRate = Number(searchParams.get("taxRate"));
  const discountRate = Number(searchParams.get("discountRate"));
  const demandDecayMin = Number(searchParams.get("demandDecayMin"));
  const demandDecayMode = Number(searchParams.get("demandDecayMode"));
  const demandDecayMax = Number(searchParams.get("demandDecayMax"));

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
    stdError,
    lowerCI,
    upperCI,
    minProfit,
    maxProfit,
    q1,
    q2,
    q3,
    pLoseMoneyLowerCI,
    pLoseMoneyUpperCI,
    valueAtRisk,
  } = await simulateFinance(
    fixedCost,
    demandMin,
    demandMode,
    demandMax,
    yearOneMargin,
    annualMarginDecrease,
    taxRate,
    discountRate,
    demandDecayMin,
    demandDecayMode,
    demandDecayMax,
  );

  return (
    <>
      {simValues && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <Button
            className="text-3xl font-bold"
            onClick={() => router.push("/")}
          >
            Go Back
          </Button>
          <h2 className="text-2xl">Simulation Results</h2>
          <SimPlot simValues={simValues} />
          <SimStats
            minProfit={minProfit}
            maxProfit={maxProfit}
            meanProfit={meanProfit}
            lowerCI={lowerCI}
            upperCI={upperCI}
            stdError={stdError}
            q1={q1}
            q2={q2}
            q3={q3}
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
