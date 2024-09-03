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
import CashFlowInstructions from "@/components/CashFlowInstructions";

// define form schema

const formSchema = z
  .object({
    periodsPerYear: z.coerce.number().int().positive(),
    fixedCost: z.coerce.number(),
    min: z.coerce.number().optional(),
    mean: z.coerce.number().optional(),
    max: z.coerce.number().optional(),
    sd: z.coerce
      .number()
      .gte(0, {
        message: "Standard deviation must be greater than or equal to 0",
      })
      .optional(),
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
      periodsPerYear: undefined,
      fixedCost: undefined,
      min: undefined,
      mean: undefined,
      max: undefined,
      sd: undefined,
    },
  });

  // define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { periodsPerYear, fixedCost, min, mean, max, sd } = values;
    router.push(
      `/results/cashflow?periodsPerYear=${periodsPerYear}&fixedCost=${fixedCost}&min=${min ?? "0"}&mean=${mean ?? "0"}&max=${max ?? "0"}&sd=${sd ?? "0"}`,
    );
  }

  return (
    <>
      <CashFlowInstructions />
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
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel>Total Annual Fixed Costs</FormLabel>
          <FormField
            control={form.control}
            name="fixedCost"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel>Distribution of Periodic Cash Flows</FormLabel>
          <Select
            onValueChange={(value) => setDistribution(value)}
            value={distribution}
          >
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="norm">Normal</SelectItem>
              <SelectItem value="triangular">Triangular</SelectItem>
              <SelectItem value="truncnorm">Truncated Normal</SelectItem>
              <SelectItem value="uniform">Uniform</SelectItem>
            </SelectContent>
          </Select>
          {/* conditional rendering for min cash flow */}
          {(distribution === "triangular" ||
            distribution === "truncnorm" ||
            distribution === "uniform") && (
            <>
              <FormLabel>Minimum</FormLabel>
              <FormField
                control={form.control}
                name="min"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" {...field} />
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
              <FormLabel>Mean</FormLabel>
              <FormField
                control={form.control}
                name="mean"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" {...field} />
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
              <FormLabel>Maximum</FormLabel>
              <FormField
                control={form.control}
                name="max"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" {...field} />
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
              <FormLabel>Standard Deviation</FormLabel>
              <FormField
                control={form.control}
                name="sd"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" {...field} />
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
    </>
  );
}
