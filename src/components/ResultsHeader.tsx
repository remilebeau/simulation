import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ResultsHeader() {
  const router = useRouter();
  return (
    <>
      <Button className="text-2xl font-bold" onClick={() => router.push("/")}>
        Go Back
      </Button>
      <h2 className="text-2xl font-bold">Simulation Results</h2>
    </>
  );
}
