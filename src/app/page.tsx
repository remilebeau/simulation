import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import SelectOption from "@/components/SelectOption";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-8">
      <h1 className="text-3xl font-bold">Monte Carlo Simulation</h1>
      <p>Select a model or distribution and input the parameters.</p>
      <p>
        If you wish to download the values for your own analysis, please visit
        the{" "}
        <a
          href="https://remilebeau-simulation-api.vercel.app/docs"
          rel="noreferrer"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          API docs
        </a>
      </p>
      <SelectOption />
      <ThemeSwitch />
    </main>
  );
}
