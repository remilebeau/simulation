import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import SelectOption from "@/components/SelectOption";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col items-center gap-4 p-4">
      <h1 className="w-full rounded-xl bg-primary p-4 text-center text-xl font-bold text-primary-foreground">
        Monte Carlo Simulation
      </h1>
      <p>Select a business scenario and input the parameters.</p>
      <p>
        To download the raw output data for your own analysis, please visit the{" "}
        <a
          href="https://simulation-api-rsaw.onrender.com/docs"
          rel="noreferrer"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          API docs.
        </a>
      </p>
      <SelectOption />
      <ThemeSwitch />
    </main>
  );
}
