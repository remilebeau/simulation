import Button from "@/components/Button";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-4">
      <h1 className="w-full rounded-xl bg-white p-4 text-center text-xl font-bold text-black">
        Select a simulation or optimization model to test:
      </h1>
      <Button
        href="/production"
        label="Monte Carlo Simulation for Production Planning"
      />
      <Button href="/staffing" label="Optimization Model for Staffing" />
    </main>
  );
}
