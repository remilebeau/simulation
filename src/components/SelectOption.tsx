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
import { Label } from "@/components/ui/label";

export default function SelectModel() {
  // client component imports
  const ProductionForm = dynamic(() => import("@/components/ProductionForm"), {
    ssr: false,
  });
  const FinanceForm = dynamic(() => import("@/components/FinanceForm"), {
    ssr: false,
  });
  const CashFlowForm = dynamic(() => import("@/components/CashFlowForm"), {
    ssr: false,
  });
  const TriangularForm = dynamic(() => import("@/components/TriangularForm"), {
    ssr: false,
  });
  const TruncNormForm = dynamic(() => import("@/components/TruncNormForm"), {
    ssr: false,
  });
  const UniformForm = dynamic(() => import("@/components/UniformForm"), {
    ssr: false,
  });
  const NormForm = dynamic(() => import("@/components/NormForm"), {
    ssr: false,
  });

  const [option, setOption] = useState("");

  return (
    <section className="flex flex-col gap-4 p-4">
      <Label htmlFor="option">Select Option</Label>
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
          <SelectItem value="uniform">
            Generate Values from a Uniform Distribution
          </SelectItem>
          <SelectItem value="norm">
            Generate Values from a Normal Distribution
          </SelectItem>
          <SelectItem value="production">
            Monte Carlo Simulation for Production
          </SelectItem>
          <SelectItem value="finance">
            Monte Carlo Simulation for Finance
          </SelectItem>
          <SelectItem value="cashflow">
            Monte Carlo Simulation for Cash Flow
          </SelectItem>
        </SelectContent>
      </Select>

      {option === "triangular" && <TriangularForm />}
      {option === "truncnorm" && <TruncNormForm />}
      {option === "uniform" && <UniformForm />}
      {option === "norm" && <NormForm />}
      {option === "production" && <ProductionForm />}
      {option === "finance" && <FinanceForm />}
      {option === "cashflow" && <CashFlowForm />}
    </section>
  );
}
