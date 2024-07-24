"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import getNormValues from "@/lib/getNormValues";
import ModelInputs from "@/components/ModelInputs";

export default async function NormResults() {
  // client component imports
  const Histogram = dynamic(() => import("@/components/Histogram"), {
    ssr: false,
  });
  const BackButton = dynamic(() => import("@/components/BackButton"), {
    ssr: false,
  });
  const searchParams = useSearchParams();

  // get query params
  const distMean = searchParams.get("distMean");
  const distSD = searchParams.get("distSD");

  const { distValues } = await getNormValues(distMean!, distSD!);
  const inputs = [
    {
      name: "Mean",
      value: distMean!,
    },
    {
      name: "Standard Deviation",
      value: distSD!,
    },
  ];
  return (
    <>
      {distValues && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Normal Distribution</h1>
          <ModelInputs inputs={inputs} />
          <Histogram values={distValues} />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
