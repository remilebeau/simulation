"use client";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import getTruncNormValues from "@/lib/getTruncNormValues";

export default async function TruncNormResults() {
  // client component imports
  const DistPlot = dynamic(() => import("@/components/DistPlot"), {
    ssr: false,
  });
  const BackButton = dynamic(() => import("@/components/BackButton"), {
    ssr: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  // get query params
  const distMin = searchParams.get("distMin");
  const distMean = searchParams.get("distMean");
  const distMax = searchParams.get("distMax");
  const distSD = searchParams.get("distSD");

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
          <DistPlot
            simValues={distValues}
            min={distMin!}
            mode={distMean!}
            max={distMax!}
            sd={distSD!}
          />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
