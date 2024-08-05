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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { determineDistribution } from "@/lib/validation";

// define form schema

const formSchema = z
  .object({
    distMin: z.coerce.number(),
    distMode: z.coerce.number(),
    distMax: z.coerce.number(),
    distSD: z.coerce.number().gte(0, {
      message: "Standard Deviation must be greater than or equal to 0",
    }),
  })
  // validate that the inputs match one of the required distributions
  .refine(
    (fields) =>
      determineDistribution(
        fields.distMin,
        fields.distMode,
        fields.distMax,
        fields.distSD,
      ) !== null,
    {
      message:
        "Only these distributions are allowed: triangular, normal, uniform, truncated normal",
      path: ["distMin"],
    },
  );

export default function RandomValuesForm() {
  const router = useRouter();
  const [distribution, setDistribution] = useState<string>("");
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      distMin: 0,
      distMode: 0,
      distMax: 0,
      distSD: 0,
    },
  });

  // define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { distMin, distMode, distMax, distSD } = values;
    router.push(
      `/results/randomvalues?min=${distMin}&mean=${distMode}&max=${distMax}&sd=${distSD}`,
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
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
            <FormLabel>Minimum</FormLabel>
            <FormField
              control={form.control}
              name="distMin"
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
            <FormLabel>Mean</FormLabel>
            <FormField
              control={form.control}
              name="distMode"
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
            <FormLabel>Maximum</FormLabel>
            <FormField
              control={form.control}
              name="distMax"
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
            <FormLabel>Standard Deviation</FormLabel>
            <FormField
              control={form.control}
              name="distSD"
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
