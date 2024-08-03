import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import SelectOption from "@/components/SelectOption";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-8">
      <h1 className="rounded-xl bg-primary p-4 text-center text-5xl font-bold">
        Monte Carlo Simulation
      </h1>
      <p className="text-xl">
        Select a model or distribution and input the parameters
      </p>
      <p className="text-xl">
        For more information on the assumptions of the models, or to download
        the values for your own analysis, please visit the{" "}
        <a
          href="https://simulation-api-rsaw.onrender.com/docs"
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
