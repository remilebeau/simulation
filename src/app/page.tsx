import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import SelectOption from "@/components/SelectOption";
import HomePageInstructions from "@/components/HomePageInstructions";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col items-center gap-4 p-4">
      <h1 className="w-full rounded-xl bg-primary p-4 text-center text-xl font-bold text-primary-foreground">
        Monte Carlo Simulation
      </h1>
      <HomePageInstructions />
      <SelectOption />
      <ThemeSwitch />
    </main>
  );
}
