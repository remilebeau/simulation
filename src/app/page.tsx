import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import SelectModel from "@/components/SelectModel";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-8">
      <h1 className="text-3xl font-bold">Monte Carlo Simulation</h1>
      <p>Select a model and input the parameters.</p>
      <SelectModel />
      <ThemeSwitch />
    </main>
  );
}
