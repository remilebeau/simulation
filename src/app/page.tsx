import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-4">
      <h1 className="w-full rounded-xl bg-white p-4 text-center text-xl font-bold text-black">
        Select a simulation or optimization model to test:
      </h1>
      <button className="w-full rounded-xl bg-white text-3xl font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
        <Link href="/production">
          Monte Carlo Simulation for Production Planning
        </Link>
      </button>
      <button className="w-full rounded-xl bg-white text-3xl font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
        <Link href="/staffing">Optimization Model for Staffing</Link>
      </button>
    </main>
  );
}
