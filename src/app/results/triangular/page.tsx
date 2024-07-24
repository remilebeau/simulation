"use client";
import dynamic from "next/dynamic";
import getTriValues from "@/lib/getTriValues";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ModelInputs from "@/components/ModelInputs";

export default async function TriangleResults() {
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
  const distMode = searchParams.get("distMode");
  const distMax = searchParams.get("distMax");

  const { distValues } = await getTriValues(distMin!, distMode!, distMax!);
  const inputs = [
    {
      name: "Min",
      value: distMin!,
    },
    {
      name: "Mode",
      value: distMode!,
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
          <h1 className="text-3xl font-bold">Triangular Distribution</h1>
          <ModelInputs inputs={inputs} />
          <Histogram values={distValues} />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
