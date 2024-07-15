"use client";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();

  // get query params
  const distMin = Number(searchParams.get("distMin")) || undefined;
  const distMean = Number(searchParams.get("distMean")) || undefined;
  const distMax = Number(searchParams.get("distMax")) || undefined;
  const distSD = Number(searchParams.get("distSD")) || undefined;

  // validate query params
  if (!distMin || !distMean || !distMax || !distSD) {
    router.push("/");
  }

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
