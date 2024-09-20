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
    unitCost: z.coerce.number(),
    unitPrice: z.coerce.number(),
    salvagePrice: z.coerce.number(),
    demandMin: z.coerce.number().optional(),
    demandMean: z.coerce.number().optional(),
    demandMax: z.coerce.number().optional(),
    demandSD: z.coerce
      .number()
      .gte(0, {
        message: "Standard deviation must be greater than or equal to 0",
      })
      .optional(),
    fixedCost: z.coerce.number(),
    productionQuantity: z.coerce.number().gt(0, {
      message: "Production quantity must be greater than 0",
    }),
  })

  .refine(
    (fields) =>
      // validate that demand follows a triangular, truncated normal, uniform, or normal distribution
      determineDistribution(
        fields.demandMin,
        fields.demandMean,
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
      demandMean: undefined,
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
      demandMean,
      demandMax,
      demandSD,
      fixedCost,
      productionQuantity,
    } = values;
    router.push(
      `/results/production?unitCost=${unitCost}&unitPrice=${unitPrice}&salvagePrice=${salvagePrice}&demandMin=${demandMin ?? "0"}&demandMean=${demandMean ?? "0"}&demandMax=${demandMax ?? "0"}&demandSD=${demandSD ?? "0"}&fixedCost=${fixedCost}&productionQuantity=${productionQuantity}`,
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
                <Input className="text-black" type="number" {...field} />
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
                <Input className="text-black" type="number" {...field} />
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
                <Input className="text-black" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Fixed Costs</FormLabel>
        <FormField
          control={form.control}
          name="fixedCost"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="text-black" type="number" {...field} />
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
                <Input className="text-black" type="number" {...field} />
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
          <SelectTrigger className="text-black">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="norm">Normal</SelectItem>
            <SelectItem value="triangular">Triangular</SelectItem>
            <SelectItem value="truncnorm">Truncated Normal</SelectItem>
            <SelectItem value="uniform">Uniform</SelectItem>
          </SelectContent>
        </Select>
        {/* conditional rendering for min demand */}
        {(distribution === "triangular" ||
          distribution === "truncnorm" ||
          distribution === "uniform") && (
          <>
            <FormLabel>Min Demand</FormLabel>
            <FormField
              control={form.control}
              name="demandMin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="text-black" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {/* conditional rendering for mean demand*/}
        {(distribution === "triangular" ||
          distribution === "truncnorm" ||
          distribution === "norm") && (
          <>
            <FormLabel>Mean Demand</FormLabel>
            <FormField
              control={form.control}
              name="demandMean"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="text-black" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {/* conditional rendering for max demand */}
        {(distribution === "triangular" ||
          distribution === "truncnorm" ||
          distribution === "uniform") && (
          <>
            <FormLabel>Max Demand</FormLabel>
            <FormField
              control={form.control}
              name="demandMax"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="text-black" type="number" {...field} />
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
                    <Input className="text-black" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <button
          className="w-full rounded-xl bg-teal-700 p-4 font-bold transition-all duration-300 ease-in-out hover:bg-black"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}
