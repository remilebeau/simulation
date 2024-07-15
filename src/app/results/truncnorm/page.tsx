"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import getTruncNormValues from "@/lib/getTruncNormValues";

export default async function TruncNormResults() {
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
  const distMean = searchParams.get("distMean");
  const distMax = searchParams.get("distMax");
  const distSD = searchParams.get("distSD");

  const { distValues } = await getTruncNormValues(
    distMin!,
    distMean!,
    distMax!,
    distSD!,
  );
  return (
    <>
      {distValues && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Truncated Normal Distribution</h1>
          {/* display formatted inputs */}
          <section className="grid grid-cols-2 gap-4 p-4">
            <p className="text-2xl font-bold">{`Min: ${distMin}`}</p>
            <p className="text-2xl font-bold">{`Mean: ${distMean}`}</p>
            <p className="text-2xl font-bold">{`Max: ${distMax}`}</p>
            <p className="text-2xl font-bold">{`Standard Deviation: ${distSD}`}</p>
          </section>
          <Histogram values={distValues} />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
