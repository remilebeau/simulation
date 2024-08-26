import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button className="w-full font-bold" onClick={() => router.push("/")}>
      Go Back
    </Button>
  );
}
