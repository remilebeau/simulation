import SimulationForm from "@/components/SimulationForm";
import SimulationInstructions from "@/components/SimulationInstructions";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-4 p-8">
      <h1 className="text-center text-4xl font-bold">
        Production Planning Simulation
      </h1>
      <SimulationInstructions />
      <hr />
      <SimulationForm />
    </main>
  );
}
