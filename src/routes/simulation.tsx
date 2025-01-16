import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import SimulationInstructions from "@/components/SimulationInstructions";
import SimulationForm from "@/components/SimulationForm";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/simulation")({
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
      <SimulationInstructions />
      <SimulationForm />
    </main>
  );
}
