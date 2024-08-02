"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { determineDistribution } from "@/lib/validation";

// define form schema

const formSchema = z
  .object({
    unitCost: z.coerce.number({
      required_error: "Unit cost is required",
      invalid_type_error: "Unit cost must be a number",
    }),
    unitPrice: z.coerce.number({
      required_error: "Unit price is required",
      invalid_type_error: "Unit price must be a number",
    }),
    salvagePrice: z.coerce.number({
      required_error: "Salvage price is required",
      invalid_type_error: "Salvage price must be a number",
    }),
    demandMin: z.coerce.number({
      required_error: "Demand min is required",
      invalid_type_error: "Demand min must be a number",
    }),
    demandMode: z.coerce.number({
      required_error: "Demand mode is required",
      invalid_type_error: "Demand mode must be a number",
    }),
    demandMax: z.coerce.number({
      required_error: "Demand max is required",
      invalid_type_error: "Demand max must be a number",
    }),
    demandSD: z.coerce.number({
      required_error: "Demand standard deviation is required.",
      invalid_type_error: "Demand standard deviation must be >= 0",
    }),
    fixedCost: z.coerce.number({
      required_error: "Fixed costs are required",
      invalid_type_error: "Fixed costs must be a number",
    }),
    productionQuantity: z.coerce.number({
      required_error: "Production quantity is required",
      invalid_type_error: "Production quantity must be a number",
    }),
  })

  .refine(
    (fields) =>
      // validate that demand follows a triangular, truncated normal, uniform, or normal distribution
      determineDistribution(
        fields.demandMin,
        fields.demandMode,
        fields.demandMax,
        fields.demandSD,
      ) !== null,
    {
      message:
        "Demand must follow a triangular, truncated normal, uniform, or normal distribution",
      path: ["unitCost"],
    },
  );

export default function ProductionForm() {
  const router = useRouter();
  const [distribution, setDistribution] = useState<string>("");
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unitCost: undefined,
      unitPrice: undefined,
      salvagePrice: undefined,
      demandMin: undefined,
      demandMode: undefined,
      demandMax: undefined,
      demandSD: undefined,
      fixedCost: undefined,
      productionQuantity: undefined,
    },
  });

  // define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      unitCost,
      unitPrice,
      salvagePrice,
      demandMin,
      demandMode,
      demandMax,
      demandSD,
      fixedCost,
      productionQuantity,
    } = values;
    router.push(
      `/results/production?unitCost=${unitCost}&unitPrice=${unitPrice}&salvagePrice=${salvagePrice}&demandMin=${demandMin}&demandMode=${demandMode}&demandMax=${demandMax}&demandSD=${demandSD}&fixedCost=${fixedCost}&productionQuantity=${productionQuantity}`,
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <FormLabel>Unit Cost</FormLabel>
        <FormField
          control={form.control}
          name="unitCost"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Unit Price</FormLabel>
        <FormField
          control={form.control}
          name="unitPrice"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Salvage Price</FormLabel>
        <FormField
          control={form.control}
          name="salvagePrice"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label htmlFor="option">Demand Distribution</Label>
        <Select
          onValueChange={(value) => setDistribution(value)}
          value={distribution}
        >
          <SelectTrigger>
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="triangular">Triangular</SelectItem>
            <SelectItem value="truncnorm">Truncated Normal</SelectItem>
            <SelectItem value="uniform">Uniform</SelectItem>
            <SelectItem value="norm">Normal</SelectItem>
          </SelectContent>
        </Select>
        {/* conditional rendering for demand minimum */}
        {(distribution === "triangular" ||
          distribution === "truncnorm" ||
          distribution === "uniform") && (
          <>
            <FormLabel>Demand Minimum</FormLabel>
            <FormField
              control={form.control}
              name="demandMin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {/* conditional rendering for demand mean */}
        {(distribution === "triangular" ||
          distribution === "truncnorm" ||
          distribution === "norm") && (
          <>
            <FormLabel>Demand Mean</FormLabel>
            <FormField
              control={form.control}
              name="demandMode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {/* conditional rendering for demand maximum */}
        {(distribution === "triangular" ||
          distribution === "truncnorm" ||
          distribution === "uniform") && (
          <>
            <FormLabel>Demand Maximum</FormLabel>
            <FormField
              control={form.control}
              name="demandMax"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {/* conditional rendering for demand standard deviation */}
        {(distribution === "truncnorm" || distribution === "norm") && (
          <>
            <FormLabel>Demand Standard Deviation</FormLabel>
            <FormField
              control={form.control}
              name="demandSD"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormLabel>Fixed Costs</FormLabel>
        <FormField
          control={form.control}
          name="fixedCost"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Production Quantity</FormLabel>
        <FormField
          control={form.control}
          name="productionQuantity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
