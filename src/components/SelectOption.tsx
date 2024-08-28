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
  const RandomValuesForm = dynamic(
    () => import("@/components/RandomValuesForm"),
    {
      ssr: false,
    },
  );
  const ProductionForm = dynamic(() => import("@/components/ProductionForm"), {
    ssr: false,
  });
  const FinanceForm = dynamic(() => import("@/components/FinanceForm"), {
    ssr: false,
  });
  const CashFlowForm = dynamic(() => import("@/components/CashFlowForm"), {
    ssr: false,
  });
  const MarketingForm = dynamic(() => import("@/components/MarketingForm"), {
    ssr: false,
  });

  const [option, setOption] = useState("");

  return (
    <section className="flex w-full flex-col gap-4">
      <Label htmlFor="option">Select Option</Label>
      <Select onValueChange={(value) => setOption(value)} value={option}>
        <SelectTrigger>
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="randomvalues">Pseudorandom Values</SelectItem>
          <SelectItem value="production">Production Planning</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
          {/* <SelectItem value="finance">
            Monte Carlo Simulation for Finance
          </SelectItem> */}
          <SelectItem value="cashflow">Cash Flow</SelectItem>
        </SelectContent>
      </Select>

      {option === "randomvalues" && <RandomValuesForm />}
      {option === "production" && <ProductionForm />}
      {option === "marketing" && <MarketingForm />}
      {option === "finance" && <FinanceForm />}
      {option === "cashflow" && <CashFlowForm />}
    </section>
  );
}
