"use client";
import dynamic from "next/dynamic";
import simulateRandomValues from "@/lib/simulateRandomValues";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ModelInputs from "@/components/ModelInputs";

export default async function ProductionResults() {
  // client component imports
  const Histogram = dynamic(() => import("@/components/Histogram"), {
    ssr: false,
  });
  const BackButton = dynamic(() => import("@/components/BackButton"), {
    ssr: false,
  });
  const searchParams = useSearchParams();

  // get query params
  const min = searchParams.get("min");
  const mean = searchParams.get("mean");
  const max = searchParams.get("max");
  const sd = searchParams.get("sd");

  const { distribution, distValues } = await simulateRandomValues(
    min,
    mean,
    max,
    sd,
  );
  let inputs = [];
  if (min && Number(min) > 0) {
    inputs.push({ name: "Min", value: min });
  }
  if (mean && Number(mean) > 0) {
    inputs.push({ name: "Mean", value: mean });
  }
  if (max && Number(max) > 0) {
    inputs.push({ name: "Max", value: max });
  }
  if (sd && Number(sd) > 0) {
    inputs.push({ name: "Standard Deviation", value: sd });
  }
  return (
    <>
      {distValues && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">
            Distribution: {distribution.toUpperCase()}
          </h1>
          <ModelInputs inputs={inputs} />
          <Histogram values={distValues} />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
