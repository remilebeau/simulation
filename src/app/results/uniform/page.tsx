"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import getUniValues from "@/lib/getUniValues";
import ModelInputs from "@/components/ModelInputs";

export default async function UniformResults() {
  // client component imports
  const Histogram = dynamic(() => import("@/components/Histogram"), {
    ssr: false,
  });
  const BackButton = dynamic(() => import("@/components/BackButton"), {
    ssr: false,
  });
  const searchParams = useSearchParams();

  // get query params
  const distMin = searchParams.get("distMin");
  const distMax = searchParams.get("distMax");

  const { distValues } = await getUniValues(distMin!, distMax!);
  const inputs = [
    {
      name: "Min",
      value: distMin!,
    },
    {
      name: "Max",
      value: distMax!,
    },
  ];
  return (
    <>
      {distValues && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Uniform Distribution</h1>
          <ModelInputs inputs={inputs} />
          <Histogram values={distValues} />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
