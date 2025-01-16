import { Button } from "@/components/ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-4">
      <h1 className="p-4 text-center text-3xl font-bold">
        Select a simulation or optimization model:
      </h1>
      <Button
        className="rounded-xl"
        asChild
        title="Simulation for Production Planning"
      >
        <Link to="/simulation">Simulation Model for Production Planning</Link>
      </Button>
      <Button
        className="rounded-xl"
        asChild
        title="Monte Carlo Simulation for Financial Planning"
      >
        <Link to="/optimization">Optimization Model for Staffing</Link>
      </Button>
    </main>
  );
}
