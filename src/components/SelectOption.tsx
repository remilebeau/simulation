"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectModel() {
  // client component imports
  const ProductionForm = dynamic(() => import("@/components/ProductionForm"), {
    ssr: false,
  });
  const TriangularForm = dynamic(() => import("@/components/TriangularForm"), {
    ssr: false,
  });
  const TruncNormForm = dynamic(() => import("@/components/TruncNormForm"), {
    ssr: false,
  });

  const [option, setOption] = useState("");

  return (
    <section className="flex flex-col gap-4 p-4">
      <label htmlFor="option">Select Option</label>
      <Select onValueChange={(value) => setOption(value)} value={option}>
        <SelectTrigger>
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="triangular">
            Generate Values from a Triangular Distribution
          </SelectItem>
          <SelectItem value="truncnorm">
            Generate Values from a Truncated Normal Distribution
          </SelectItem>
          <SelectItem value="production">
            Monte Carlo Simulation for Production
          </SelectItem>
        </SelectContent>
      </Select>

      {option === "triangular" && <TriangularForm />}
      {option === "truncnorm" && <TruncNormForm />}
      {option === "production" && <ProductionForm />}
    </section>
  );
}
