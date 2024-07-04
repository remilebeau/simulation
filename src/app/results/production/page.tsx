"use client";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";

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
  const distMin = Number(searchParams.get("distMin"));
  const distMode = Number(searchParams.get("distMode"));
  const distMax = Number(searchParams.get("distMax"));
  const simPeriodsPerYear = Number(searchParams.get("simPeriodsPerYear"));

  // validate query params
  if (!distMin || !distMode || !distMax || !simPeriodsPerYear) {
    router.push("/");
  }

  const { distValues } = await getTriDistValues(distMin, distMode, distMax);
  const {
    simValues,
    simMin,
    simMax,
    simMean,
    simQ1,
    simQ2,
    simQ3,
    lowerCI,
    upperCI,
  } = await getTriSimValues(distMin, distMode, distMax, simPeriodsPerYear);

  return (
    <>
      {distValues && simValues && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <Button
            className="text-3xl font-bold"
            onClick={() => router.push("/")}
          >
            Go Back
          </Button>
          <h1 className="text-center text-3xl font-bold">Results</h1>
          <h2 className="text-2xl font-bold">
            Distribution of Periodic Cash Flows
          </h2>
          <section className="grid grid-cols-2 gap-4 p-4">
            <p className="text-xl">Distribution: Triangular</p>
            <p className="text-xl">Min: {distMin}</p>
            <p className="text-xl">Mode: {distMode}</p>
            <p className="text-xl">Max: {distMax}</p>
          </section>

          <DistPlot distValues={distValues} />
          <h2 className="text-2xl">Simulation Results</h2>
          <p className="text-xl">Periods per Year: {simPeriodsPerYear}</p>
          <SimPlot simValues={simValues} />
          <SimStats
            simMin={simMin}
            simQ1={simQ1}
            simMean={simMean}
            simQ2={simQ2}
            simQ3={simQ3}
            simMax={simMax}
            lowerCI={lowerCI}
            upperCI={upperCI}
          />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
