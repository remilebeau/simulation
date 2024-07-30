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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { determineDistribution } from "@/lib/validation";

// define form schema

const formSchema = z
  .object({
    periodsPerYear: z.coerce.number({
      required_error: "Periods per year is required",
      invalid_type_error: "Periods per year must be a number",
    }),
    min: z.coerce.number({
      required_error: "Min value is required",
      invalid_type_error: "Min value must be a number",
    }),
    mean: z.coerce.number({
      required_error: "Mean is required",
      invalid_type_error: "Mean must be a number",
    }),
    max: z.coerce.number({
      required_error: "Max value is required",
      invalid_type_error: "Max value must be a number",
    }),
    sd: z.coerce.number({
      required_error: "Standard deviation is required",
      invalid_type_error: "Standard deviation must be a number",
    }),
  })

  .refine(
    (fields) =>
      // validate that demand follows a triangular, truncated normal, uniform, or normal distribution
      determineDistribution(fields.min, fields.mean, fields.max, fields.sd) !==
      null,
    {
      message:
        "Demand must follow a triangular, truncated normal, uniform, or normal distribution",
      path: ["periodsPerYear"],
    },
  );

export default function CashFlowForm() {
  const router = useRouter();
  const [distribution, setDistribution] = useState<string>("");
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      periodsPerYear: 0,
      min: 0,
      mean: 0,
      max: 0,
      sd: 0,
    },
  });

  // define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { periodsPerYear, min, mean, max, sd } = values;
    console.log({ periodsPerYear, min, mean, max, sd });
    // router.push(
    //   `/results/cashflow?periodsPerYear=${periodsPerYear}&min=${min}&mean=${mean}&max=${max}&sd=${sd}`,
    // );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <FormLabel>Periods per Year</FormLabel>
        <FormField
          control={form.control}
          name="periodsPerYear"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Demand Distribution</FormLabel>
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
        {/* conditional rendering for minimum */}
        {(distribution === "triangular" ||
          distribution === "truncnorm" ||
          distribution === "uniform") && (
          <>
            <FormLabel>Min Cash Flow</FormLabel>
            <FormField
              control={form.control}
              name="min"
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
        {/* conditional rendering for mean cash flow */}
        {(distribution === "triangular" ||
          distribution === "truncnorm" ||
          distribution === "norm") && (
          <>
            <FormLabel>Mean Cash Flow</FormLabel>
            <FormField
              control={form.control}
              name="mean"
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
        {/* conditional rendering for max cash flow */}
        {(distribution === "triangular" ||
          distribution === "truncnorm" ||
          distribution === "uniform") && (
          <>
            <FormLabel>Max Cash Flow</FormLabel>
            <FormField
              control={form.control}
              name="max"
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
        {/* conditional rendering for standard deviation of cash flows */}
        {(distribution === "truncnorm" || distribution === "norm") && (
          <>
            <FormLabel>Standard Deviation of Cash Flows</FormLabel>
            <FormField
              control={form.control}
              name="sd"
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

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
