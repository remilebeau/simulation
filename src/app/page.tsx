import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import SelectOption from "@/components/SelectOption";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-8">
      <h1 className="rounded-xl bg-primary p-4 text-center text-5xl font-bold text-primary-foreground">
        Monte Carlo Simulation
      </h1>
      <p className="text-xl">
        Select a probability distribution or business model and input the
        parameters below.
      </p>
      <p className="text-xl">
        To learn more about the models, or to download the output values for
        your own analysis, please visit the{" "}
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
