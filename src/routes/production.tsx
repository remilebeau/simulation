import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import ProductionInstructions from "@/components/ProductionInstructions";
import ProductionForm from "@/components/ProductionForm";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/production")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-4">
      <h1 className="w-full rounded-xl bg-white p-4 text-center text-3xl font-bold text-black">
        Monte Carlo Simulation for Production Planning
      </h1>
      <Button asChild>
        <Link to="/">Back to Home</Link>
      </Button>
      <ProductionInstructions />
      <ProductionForm />
    </main>
  );
}
