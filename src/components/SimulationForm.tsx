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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
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
    setSimData(data);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && simData && <SimStats simData={simData} />}
      {!isLoading && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-xl sm:grid sm:grid-cols-3"
          >
            <FieldWithLabel
              labelColor="text-red-500"
              label="fixedCosts"
              name="fixedCost"
            />
            <FieldWithLabel
              labelColor="text-red-500"
              label="unitPrice"
              name="unitPrice"
            />
            <FieldWithLabel
              labelColor="text-red-500"
              label="salvagePrice"
              name="salvagePrice"
            />
            <FieldWithLabel
              labelColor="text-red-500"
              label="productionQuantity"
              name="productionQuantity"
            />
            <FieldWithLabel
              labelColor="text-red-500"
              label="unitCost"
              name="unitCost"
            />
            <FieldWithLabel
              labelColor="text-green-500"
              label="Minimum Demand (units)"
              name="demandMin"
            />
            <FieldWithLabel
              labelColor="text-green-500"
              label="Expected Demand (units)"
              name="demandMean"
            />
            <FieldWithLabel
              labelColor="text-green-500"
              label="Maximum Demand (units)"
              name="demandMax"
            />
            <FieldWithLabel
              labelColor="text-green-500"
              label="Demand Standard Deviation (units)"
              name="demandSD"
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
