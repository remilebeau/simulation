"use client";
import dynamic from "next/dynamic";
import getTriValues from "@/lib/getTriValues";
import { useRouter, useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import ResultsHeader from "@/components/ResultsHeader";

export default async function TriangleResults() {
  // client component imports
  const DistPlot = dynamic(() => import("@/components/DistPlot"), {
    ssr: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  // get query params
  const distMin = searchParams.get("distMin");
  const distMode = searchParams.get("distMode");
  const distMax = searchParams.get("distMax");

  // validate query params
  if (!distMin || !distMode || !distMax) {
    router.push("/");
  }

  const { distValues } = await getTriValues(distMin!, distMode!, distMax!);
  return (
    <>
      {distValues && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <ResultsHeader />
          <DistPlot
            simValues={distValues}
            min={distMin!}
            mode={distMode!}
            max={distMax!}
          />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
