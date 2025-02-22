import SimulationForm from "@/components/SimulationForm";
import SimulationInstructions from "@/components/SimulationInstructions";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-4 p-8">
      <h1 className="text-center text-4xl font-bold">
        Simulation for Production Planning
      </h1>
      <SimulationInstructions />
      <hr />
      <SimulationForm />
    </main>
  );
}
