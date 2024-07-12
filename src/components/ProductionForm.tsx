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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    fixedCost: z.coerce.number({
      required_error: "Fixed costs are required",
      invalid_type_error: "Fixed costs must be a number",
    }),
    productionQuantity: z.coerce.number({
      required_error: "Production quantity is required",
      invalid_type_error: "Production quantity must be a number",
    }),
  })
  // validate triangular demand distribution
  .refine(
    (fields) =>
      fields.demandMin <= fields.demandMode &&
      fields.demandMode <= fields.demandMax &&
      fields.demandMin < fields.demandMax,
    {
      message: "Invalid data, please review.",
      path: ["unitCost"],
    },
  );

export default function ProductionForm() {
  const router = useRouter();
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
      fixedCost,
      productionQuantity,
    } = values;
    router.push(
      `/results/production?unitCost=${unitCost}&unitPrice=${unitPrice}&salvagePrice=${salvagePrice}&demandMin=${demandMin}&demandMode=${demandMode}&demandMax=${demandMax}&fixedCost=${fixedCost}&productionQuantity=${productionQuantity}`,
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
                <Input
                  type="number"
                  placeholder="Production cost per unit (e.g. $80)"
                  {...field}
                />
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
                <Input
                  type="number"
                  placeholder="Sell price per unit (e.g. $100)"
                  {...field}
                />
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
                <Input
                  type="number"
                  placeholder="Salvage price per unit (e.g. $30)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Minimum Demand</FormLabel>
        <FormField
          control={form.control}
          name="demandMin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Minimum demand (e.g. 5,000)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Expected Demand</FormLabel>
        <FormField
          control={form.control}
          name="demandMode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Expected demand (e.g. 12,000)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Maximum Demand</FormLabel>
        <FormField
          control={form.control}
          name="demandMax"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Expected demand (e.g. 16,000)"
                  {...field}
                />
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
                <Input
                  type="number"
                  placeholder="Total fixed costs (e.g. $100,000)"
                  {...field}
                />
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
                <Input
                  type="number"
                  placeholder="The number of units to produce (e.g. 7,800)"
                  {...field}
                />
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
