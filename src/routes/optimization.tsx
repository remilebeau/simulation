import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/optimization")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/optimization"!</div>;
}
