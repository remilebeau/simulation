"use client";
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
import { isValidInput } from "@/lib/validation";

// define form schema

const formSchema = z
  .object({
    unitCost: z.coerce.number(),
    unitPrice: z.coerce.number(),
    salvagePrice: z.coerce.number(),
    demandMin: z.coerce.number(),
    demandMean: z.coerce.number(),
    demandMax: z.coerce.number(),
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
      // validate input
      isValidInput(
        fields.demandMin,
        fields.demandMean,
        fields.demandMax,
        fields.demandSD,
      ),
    {
      message:
        "Please check that (min <= mean <= max) and (min < max) and (sd >= 0)",
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
      `/results/production?unitCost=${unitCost}&unitPrice=${unitPrice}&salvagePrice=${salvagePrice}&demandMin=${demandMin}&demandMean=${demandMean}&demandMax=${demandMax}&demandSD=${demandSD}&fixedCost=${fixedCost}&productionQuantity=${productionQuantity}`,
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-xl border border-white p-4"
      >
        <FormLabel>Unit Cost</FormLabel>
        <FormField
          control={form.control}
          name="unitCost"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  required
                  placeholder="Variable costs per unit"
                  className="bg-black text-white"
                  type="number"
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
                  required
                  placeholder="Sell price per unit"
                  className="bg-black text-white"
                  type="number"
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
                  required
                  placeholder="Salvage value for each unit produced above demand"
                  className="bg-black text-white"
                  type="number"
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
                  required
                  placeholder="Total fixed costs of the production"
                  className="bg-black text-white"
                  type="number"
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
                  required
                  placeholder="Minimum value of forecasted demand"
                  className="bg-black text-white"
                  type="number"
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
          name="demandMean"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  required
                  placeholder="Expected value of forecasted demand"
                  className="bg-black text-white"
                  type="number"
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
                  required
                  placeholder="Maximum value of forecasted demand"
                  className="bg-black text-white"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Demand Standard Deviation</FormLabel>
        <FormField
          control={form.control}
          name="demandSD"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  required
                  placeholder="Set to 0 if unknown"
                  className="bg-black text-white"
                  type="number"
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
                  required
                  placeholder="Total production quantity"
                  className="bg-black text-white"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
