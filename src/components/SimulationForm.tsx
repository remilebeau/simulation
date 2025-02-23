"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import simulateProduction from "@/lib/simulateProduction";
import { useState } from "react";
import SimStats from "@/components/SimulationStats";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import FieldWithLabel from "@/components/FieldWithLabel";
import type { ProductionResults } from "@/types/ProductionResults";

const formSchema = z
  .object({
    unitCost: z.coerce.number().gte(0),
    unitPrice: z.coerce.number().gte(0),
    salvagePrice: z.coerce.number().gte(0),
    demandMin: z.coerce.number().gte(0),
    demandMean: z.coerce.number().gte(0),
    demandMax: z.coerce.number().gte(0),
    demandSD: z.coerce.number().gt(0),
    fixedCost: z.coerce.number(),
    productionQuantity: z.coerce.number().gt(0, {
      message: "Production quantity must be greater than 0",
    }),
  })

  .refine(
    (fields) => () => {
      return (
        fields.demandMin <= fields.demandMean &&
        fields.demandMean <= fields.demandMax &&
        fields.demandMin < fields.demandMax &&
        fields.demandSD > 0
      );
    },
    {
      message:
        "Please check that (min <= mean <= max) and (min < max) and (sd > 0)",
      path: ["demandMin"],
    },
  );

export default function SimulationForm() {
  const [simData, setSimData] = useState<ProductionResults | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrMsg("");
    setIsLoading(true);
    try {
      const data = await simulateProduction(
        values.unitCost,
        values.unitPrice,
        values.salvagePrice,
        values.demandMin,
        values.demandMean,
        values.demandMax,
        values.demandSD,
        values.fixedCost,
        values.productionQuantity,
      );
      if (!data) {
        setErrMsg("Something went wrong. Please try again.");
        return;
      }
      setSimData(data);
    } catch (error) {
      setErrMsg("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && simData && <SimStats simData={simData} />}
      {errMsg && <p className="text-red-500">{errMsg}</p>}
      {!isLoading && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-xl sm:grid sm:grid-cols-3"
          >
            <FieldWithLabel label="Unit Cost" name="unitCost" />
            <FieldWithLabel label="Unit price" name="unitPrice" />
            <FieldWithLabel label="Salvage Price" name="salvagePrice" />
            <FieldWithLabel label="Fixed Costs" name="fixedCost" />
            <FieldWithLabel label="Minimum Demand" name="demandMin" />
            <FieldWithLabel label="Expected Demand" name="demandMean" />
            <FieldWithLabel label="Maximum Demand" name="demandMax" />
            <FieldWithLabel label="Demand Standard Deviation" name="demandSD" />
            <FieldWithLabel
              label="Production Quantity"
              name="productionQuantity"
            />

            <Button className="rounded-xl sm:col-span-3" type="submit">
              Simulate
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
