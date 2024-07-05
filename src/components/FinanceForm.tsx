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
    fixedCost: z.coerce.number({
      required_error: "Fixed costs are required",
      invalid_type_error: "Fixed costs must be a number",
    }),
    demandMin: z.coerce.number({
      required_error: "Demand minimum is required",
      invalid_type_error: "Demand minimum must be a number",
    }),
    demandMode: z.coerce.number({
      required_error: "Demand mode is required",
      invalid_type_error: "Demand mode must be a number",
    }),
    demandMax: z.coerce.number({
      required_error: "Demand max is required",
      invalid_type_error: "Demand max must be a number",
    }),
    yearOneMargin: z.coerce.number({
      required_error: "Year one margin is required",
      invalid_type_error: "Year one margin must be a number",
    }),
    annualMarginDecrease: z.coerce.number({
      required_error: "Annual margin decrease is required",
      invalid_type_error: "Annual margin decrease must be between 0 and 1",
    }),
    taxRate: z.coerce.number({
      required_error: "Tax rate is required",
      invalid_type_error: "Tax rate must be between 0 and 1",
    }),
    discountRate: z.coerce.number({
      required_error: "Discount rate is required",
      invalid_type_error: "Discount rate must be between 0 and 1",
    }),
    demandDecayMin: z.coerce.number({
      required_error: "Demand decay minimum is required",
      invalid_type_error: "Demand decay minimum must be between 0 and 1",
    }),
    demandDecayMode: z.coerce.number({
      required_error: "Demand decay mode is required",
      invalid_type_error: "Demand decay mode must be between 0 and 1",
    }),
    demandDecayMax: z.coerce.number({
      required_error: "Demand decay max is required",
      invalid_type_error: "Demand decay max must be between 0 and 1",
    }),
  })
  // validate that min <= mode <= max and min < max and simPeriodsPerYear > 0
  .refine(
    (fields) =>
      fields.demandMin <= fields.demandMode &&
      fields.demandMode <= fields.demandMax &&
      fields.demandMin < fields.demandMax &&
      fields.annualMarginDecrease >= 0 &&
      fields.annualMarginDecrease <= 1 &&
      fields.taxRate >= 0 &&
      fields.taxRate <= 1 &&
      fields.discountRate >= 0 &&
      fields.discountRate <= 1 &&
      fields.demandDecayMin >= 0 &&
      fields.demandDecayMin <= 1 &&
      fields.demandDecayMode >= 0 &&
      fields.demandDecayMode <= 1 &&
      fields.demandDecayMax >= 0 &&
      fields.demandDecayMax <= 1,
    {
      message: "Invalid data, please review.",
      path: ["fixedCost"],
    },
  );

export default function FinanceForm() {
  const router = useRouter();
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fixedCost: undefined,
      demandMin: undefined,
      demandMode: undefined,
      demandMax: undefined,
      yearOneMargin: undefined,
      annualMarginDecrease: undefined,
      taxRate: undefined,
      discountRate: undefined,
      demandDecayMin: undefined,
      demandDecayMode: undefined,
      demandDecayMax: undefined,
    },
  });

  // define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      fixedCost,
      demandMin,
      demandMode,
      demandMax,
      yearOneMargin,
      annualMarginDecrease,
      taxRate,
      discountRate,
      demandDecayMin,
      demandDecayMode,
      demandDecayMax,
    } = values;
    router.push(
      `/results/finance?fixedCost=${fixedCost}&demandMin=${demandMin}&demandMode=${demandMode}&demandMax=${demandMax}&yearOneMargin=${yearOneMargin}&annualMarginDecrease=${annualMarginDecrease}&taxRate=${taxRate}&discountRate=${discountRate}&demandDecayMin=${demandDecayMin}&demandDecayMode=${demandDecayMode}&demandDecayMax=${demandDecayMax}`,
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <FormLabel>Fixed Costs</FormLabel>
        <FormField
          control={form.control}
          name="fixedCost"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Total fixed costs for the 5-year period (e.g. $700,000,000)"
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
                  placeholder="Minimum demand based on historical data, industry knowledge, etc. (e.g. 50,000)"
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
                  placeholder="Expected demand based on historical data, industry knowledge, etc. (e.g. 75,000)"
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
                  placeholder="Maximum demand based on historical data, industry knowledge, etc. (e.g. 85,000)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Gross Profit per Unit</FormLabel>
        <FormField
          control={form.control}
          name="yearOneMargin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="The amount of gross profit per unit. Revenue / unit - COGS / unit (e.g. 4,000)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Annual Margin Decrease</FormLabel>
        <FormField
          control={form.control}
          name="annualMarginDecrease"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="The annual percentage that gross profit will decrease in years 2 to 5 (e.g. 0.05 for 5% decrease)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Tax Rate</FormLabel>
        <FormField
          control={form.control}
          name="taxRate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Marginal tax rate (e.g. 0.40)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Discount Rate</FormLabel>
        <FormField
          control={form.control}
          name="discountRate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Discount rate for future cash flows over the 5-year period (e.g. 0.10)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Minimum Demand Decay Rate</FormLabel>
        <FormField
          control={form.control}
          name="demandDecayMin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="The minimum amount of demand decay (e.g. 0.05)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Expected Demand Decay Rate</FormLabel>
        <FormField
          control={form.control}
          name="demandDecayMode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="The expected amount of demand decay (e.g. 0.08)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Maximum Demand Decay Rate</FormLabel>
        <FormField
          control={form.control}
          name="demandDecayMax"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="The maximum amount of demand decay (e.g. 0.10)"
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
