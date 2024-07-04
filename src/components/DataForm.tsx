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

export default function DataForm() {
  // client component imports
  const FinanceForm = dynamic(() => import("@/components/FinanceForm"), {
    ssr: false,
  });
  const ProductionForm = dynamic(() => import("@/components/ProductionForm"), {
    ssr: false,
  });

  const [model, setModel] = useState("");

  return (
    <>
      <label htmlFor="model">Select Model</label>
      <Select onValueChange={(value) => setModel(value)} value={model}>
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="finance">Finance</SelectItem>
          <SelectItem value="production">Production</SelectItem>
        </SelectContent>
      </Select>

      {model === "finance" && <FinanceForm />}
      {model === "production" && <ProductionForm />}
    </>
  );
}
