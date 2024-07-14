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

const isTriangular = (min: number, mode: number, max: number) => {
  return min <= mode && mode <= max && min < max;
};
const isPercent = (num: number) => {
  return num >= 0 && num <= 1;
};

// define form schema

const formSchema = z
  .object({
    fixedCost: z.coerce.number({
      required_error: "Fixed costs are required",
      invalid_type_error: "Fixed costs must be a number",
    }),
    yearOneMargin: z.coerce.number({
      required_error: "Year one margin is required",
      invalid_type_error: "Year one margin must be a number",
    }),
    yearOneSalesMin: z.coerce.number({
      required_error: "Year one sales min is required",
      invalid_type_error: "Year one sales min must be a number",
    }),
    yearOneSalesMode: z.coerce.number({
      required_error: "Year one sales mode is required",
      invalid_type_error: "Year one sales mode must be a number",
    }),
    yearOneSalesMax: z.coerce.number({
      required_error: "Year one sales max is required",
      invalid_type_error: "Year one sales max must be a number",
    }),
    annualMarginDecrease: z.coerce
      .number({
        invalid_type_error: "Annual margin decrease must be between 0 and 1",
      })
      .optional(),
    annualSalesDecayMin: z.coerce
      .number({
        invalid_type_error: "Annual sales decay min must be between 0 and 1",
      })
      .optional(),
    annualSalesDecayMode: z.coerce
      .number({
        invalid_type_error: "Annual sales decay mode must be between 0 and 1",
      })
      .optional(),
    annualSalesDecayMax: z.coerce
      .number({
        invalid_type_error: "Annual sales decay max must be between 0 and 1",
      })
      .optional(),
    taxRate: z.coerce
      .number({
        invalid_type_error: "Tax rate must be between 0 and 1",
      })
      .optional(),
    discountRate: z.coerce
      .number({
        invalid_type_error: "Discount rate must be between 0 and 1",
      })
      .optional(),
  })
  // validate data
  .refine(
    (fields) =>
      //   yearOneSales must fit a triangular distribution
      (isTriangular(
        fields.yearOneSalesMin,
        fields.yearOneSalesMode,
        fields.yearOneSalesMax,
      ) &&
        // annualSalesDecay must be undefined or a triangular distribution
        !fields.annualSalesDecayMin &&
        !fields.annualSalesDecayMode &&
        !fields.annualSalesDecayMax) ||
      (isTriangular(
        fields.annualSalesDecayMin!,
        fields.annualSalesDecayMode!,
        fields.annualSalesDecayMax!,
      ) &&
        //   annualMarginDecrease is undefined or a percentage
        !fields.annualMarginDecrease) ||
      (isPercent(fields.annualMarginDecrease!) &&
        //   taxRate is undefined or a percentage
        !fields.taxRate) ||
      (isPercent(fields.taxRate!) &&
        //   discountRate is undefined or a percentage
        !fields.discountRate) ||
      isPercent(fields.discountRate!),
    {
      message: "Invalid data, please review.",
      path: ["unitCost"],
    },
  );
export default function FinanceForm() {
  const router = useRouter();
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fixedCost: undefined,
      yearOneMargin: undefined,
      yearOneSalesMin: undefined,
      yearOneSalesMode: undefined,
      yearOneSalesMax: undefined,
      annualMarginDecrease: undefined,
      annualSalesDecayMin: undefined,
      annualSalesDecayMode: undefined,
      annualSalesDecayMax: undefined,
      taxRate: undefined,
      discountRate: undefined,
    },
  });

  // define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      fixedCost,
      yearOneMargin,
      yearOneSalesMin,
      yearOneSalesMode,
      yearOneSalesMax,
      annualMarginDecrease,
      annualSalesDecayMin,
      annualSalesDecayMode,
      annualSalesDecayMax,
      taxRate,
      discountRate,
    } = values;
    //   router.push();
    console.log({
      values,
    });
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
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Year One Margin</FormLabel>
        <FormField
          control={form.control}
          name="yearOneMargin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Year One Sales Min</FormLabel>
        <FormField
          control={form.control}
          name="yearOneSalesMin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Year One Sales Mode</FormLabel>
        <FormField
          control={form.control}
          name="yearOneSalesMode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Year One Sales Max</FormLabel>
        <FormField
          control={form.control}
          name="yearOneSalesMax"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} />
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
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Annual Sales Decay Min</FormLabel>
        <FormField
          control={form.control}
          name="annualSalesDecayMin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Annual Sales Decay Mode</FormLabel>
        <FormField
          control={form.control}
          name="annualSalesDecayMode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Annual Sales Decay Max</FormLabel>
        <FormField
          control={form.control}
          name="annualSalesDecayMax"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} />
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
                <Input type="number" {...field} />
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
                <Input type="number" {...field} />
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
