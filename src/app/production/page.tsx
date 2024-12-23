import Button from "@/components/Button";
import ProductionInstructions from "@/components/ProductionInstructions";
import dynamic from "next/dynamic";

export default function HomePage() {
  // import ProductionForm
  const ProductionForm = dynamic(() => import("@/components/ProductionForm"), {
    ssr: false,
  });
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-4">
      <h1 className="w-full rounded-xl bg-white p-4 text-center text-xl font-bold text-black">
        Monte Carlo Simulation for Production Planning
      </h1>
      <Button href="/" label="Go Back" />
      <ProductionInstructions />
      <ProductionForm />
    </main>
  );
}
