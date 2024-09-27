"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="w-full rounded-xl bg-teal-700 text-3xl font-bold transition-all duration-300 ease-in-out hover:bg-black"
      onClick={() => router.push("/")}
    >
      Go Back
    </button>
  );
}
