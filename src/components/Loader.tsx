import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <section className="flex flex-col items-center gap-4">
      <LoaderCircle className="size-16 animate-spin" />
      <h1 className="text-3xl font-bold">Loading...</h1>
      <h2 className="text-2xl font-bold">
        The first request may take up to 30 seconds...
      </h2>
    </section>
  );
}
