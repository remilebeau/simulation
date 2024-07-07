import { Loader } from "lucide-react";

export default function LoadingResults() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 p-8">
      <Loader className="h-12 w-12 animate-spin" />
      <h1 className="text-3xl font-bold">Loading...</h1>
      <h1 className="text-3xl font-bold">
        The first request may take up to 60 seconds.
      </h1>
    </main>
  );
}
