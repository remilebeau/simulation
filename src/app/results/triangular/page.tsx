"use client";
import dynamic from "next/dynamic";
import getTriValues from "@/lib/getTriValues";
import { useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";

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
  return (
    <>
      {distValues && (
        <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 p-8">
          <BackButton />
          <h1 className="text-3xl font-bold">Triangular Distribution</h1>
          {/* display formatted inputs */}
          <section className="grid grid-cols-2 gap-4 p-4 text-left text-2xl font-bold">
            <p>Min: {Number(distMin).toLocaleString("en-US")}</p>
            <p>Expected Value: {Number(distMode).toLocaleString("en-US")}</p>
            <p>Max: {Number(distMax).toLocaleString("en-US")}</p>
          </section>
          <Histogram values={distValues} />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
