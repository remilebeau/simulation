import HomePageInstructions from "@/components/HomePageInstructions";
import dynamic from "next/dynamic";

export default function HomePage() {
  // import ProductionForm
  const ProductionForm = dynamic(() => import("@/components/ProductionForm"), {
    ssr: false,
  });
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-4">
      <h1 className="w-full rounded-xl bg-teal-700 p-4 text-center text-xl font-bold">
        Monte Carlo Simulation for Production Planning
      </h1>
      <HomePageInstructions />
      <ProductionForm />
    </main>
  );
}
