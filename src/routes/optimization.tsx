import { Button } from "@/components/ui/button";
import OptimizationForm from "@/components/OptimizationForm";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/optimization")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-4">
      <h1 className="p-4 text-center text-3xl font-bold">
        Optimization Model for Staffing
      </h1>
      <Button className="rounded-xl" asChild title="Back to Home">
        <Link to="/">Back to Home</Link>
      </Button>
      <OptimizationForm />
    </main>
  );
}
