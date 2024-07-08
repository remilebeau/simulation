"use client";
import dynamic from "next/dynamic";
import getTriValues from "@/lib/getTriValues";
import { useRouter, useSearchParams } from "next/navigation";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";

export default async function TriangleResults() {
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
          <BackButton />
          <h1 className="text-3xl font-bold">Triangular Distribution</h1>
          {/* display formatted inputs */}
          <p className="text-2xl">{`Min: ${distMin}, Mode: ${distMode}, Max: ${distMax}`}</p>
          <Histogram simValues={distValues} />
          <ThemeSwitch />
        </main>
      )}
    </>
  );
}
