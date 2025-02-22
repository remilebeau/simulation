import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isValidInput } from "@/lib/validation";
import simulateProduction from "@/lib/simulateProduction";
import { useState } from "react";
import SimStats from "@/components/SimulationStats";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import SimulationInstructions from "@/components/SimulationInstructions";
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
    demandSD: z.coerce.number().gte(0, {
      message: "Standard deviation must be greater than or equal to 0",
    }),
    fixedCost: z.coerce.number(),
    productionQuantity: z.coerce.number().gt(0, {
      message: "Production quantity must be greater than 0",
    }),
  })

  .refine(
    (fields) =>
      isValidInput(
        fields.demandMin,
        fields.demandMean,
        fields.demandMax,
        fields.demandSD,
      ),
    {
      message:
        "Please check that (min <= mean <= max) and (min < max) and (sd >= 0)",
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
    if (!data) {
      setIsLoading(false);
      return;
    }
    setSimData(data);
    setIsLoading(false);
  }

  return (
    <>
      <SimulationInstructions />
      {isLoading && <Loader />}
      {!isLoading && simData && <SimStats simData={simData} />}
      {!isLoading && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-xl border p-4 sm:grid sm:grid-cols-2"
          >
            <FieldWithLabel label="Unit Cost" name="unitCost" />
            <FieldWithLabel label="Unit price" name="unitPrice" />
            <FieldWithLabel label="Salvage Price" name="salvagePrice" />
            <FieldWithLabel label="Fixed Costs" name="fixedCost" />
            <FieldWithLabel label="Minimum Demand" name="demandMin" />
            <FieldWithLabel label="Expected Demand" name="demandMean" />
            <FieldWithLabel label="Maximum Demand" name="demandMax" />
            <FieldWithLabel
              label="Demand Standard Deviation"
              name="demandSD"
              placeholder="Enter 0 if unknown"
            />
            <FieldWithLabel
              label="Production Quantity"
              name="productionQuantity"
            />

            <Button className="rounded-xl sm:col-span-2" type="submit">
              Simulate
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
