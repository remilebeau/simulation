"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="w-full rounded-xl bg-white text-3xl font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
      onClick={() => router.push("/")}
    >
      Go Back
    </button>
  );
}
