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

  const [model, setModel] = useState("");

  return (
    <section className="flex flex-col gap-4 p-4">
      <label htmlFor="model">Select Model</label>
      <Select onValueChange={(value) => setModel(value)} value={model}>
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="production">Production</SelectItem>
        </SelectContent>
      </Select>

      {model === "production" && <ProductionForm />}
    </section>
  );
}
