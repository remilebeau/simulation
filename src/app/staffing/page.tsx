import OptimizationInstructions from "@/components/OptimizationInstructions";
import dynamic from "next/dynamic";

export default function HomePage() {
  // import OptimizationForm
  const OptimizationForm = dynamic(
    () => import("@/components/OptimizationForm"),
    {
      ssr: false,
    },
  );
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-4">
      <h1 className="w-full rounded-xl bg-white p-4 text-center text-xl font-bold text-black">
        Monte Carlo Simulation for Production Planning
      </h1>
      <OptimizationInstructions />
      <OptimizationForm />
    </main>
  );
}
