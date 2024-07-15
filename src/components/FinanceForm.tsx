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
import { isTriangular, isPercent } from "@/lib/validation";

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
    annualMarginDecrease: z.coerce.number({
      invalid_type_error: "Annual margin decrease must be between 0 and 1",
    }),
    annualSalesDecayMin: z.coerce.number({
      invalid_type_error: "Annual sales decay min must be between 0 and 1",
    }),
    annualSalesDecayMode: z.coerce.number({
      invalid_type_error: "Annual sales decay mode must be between 0 and 1",
    }),
    annualSalesDecayMax: z.coerce.number({
      invalid_type_error: "Annual sales decay max must be between 0 and 1",
    }),
    taxRate: z.coerce.number({
      invalid_type_error: "Tax rate must be between 0 and 1",
    }),
    discountRate: z.coerce.number({
      invalid_type_error: "Discount rate must be between 0 and 1",
    }),
  })
  // validate data
  .refine(
    (fields) =>
      //   yearOneSales must fit a triangular distribution
      isTriangular(
        fields.yearOneSalesMin,
        fields.yearOneSalesMode,
        fields.yearOneSalesMax,
      ) &&
      // annualSalesDecay must fit a triangular distribution
      isTriangular(
        fields.annualSalesDecayMin,
        fields.annualSalesDecayMode,
        fields.annualSalesDecayMax,
      ) &&
      //   annualMarginDecrease must be a percentage
      isPercent(fields.annualMarginDecrease) &&
      //   taxRate must be a percentage
      isPercent(fields.taxRate) &&
      //   discountRate must be a percentage
      isPercent(fields.discountRate),
    {
      message:
        "Please check that: 1) Year one sales is a valid triangular distribution 2) Annual sales decay is a valid triangular distribution 3) Annual margin decrease is between 0 and 1 4) Tax rate is between 0 and 1 5) Discount rate is between 0 and 1",
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
    router.push(
      `/results/finance/?fixedCost=${fixedCost}&yearOneMargin=${yearOneMargin}&yearOneSalesMin=${yearOneSalesMin}&yearOneSalesMode=${yearOneSalesMode}&yearOneSalesMax=${yearOneSalesMax}&annualMarginDecrease=${annualMarginDecrease}&annualSalesDecayMin=${annualSalesDecayMin}&annualSalesDecayMode=${annualSalesDecayMode}&annualSalesDecayMax=${annualSalesDecayMax}&taxRate=${taxRate}&discountRate=${discountRate}`,
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
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
