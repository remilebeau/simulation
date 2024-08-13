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
import { isTriangular, isAllZero } from "@/lib/validation";
import FinanceInstructions from "@/components/FinanceInstructions";

// define form schema

const formSchema = z
  .object({
    fixedCost: z.coerce.number(),
    yearOneMargin: z.coerce.number(),
    yearOneSalesMin: z.coerce.number(),
    yearOneSalesMode: z.coerce.number(),
    yearOneSalesMax: z.coerce.number(),
    annualMarginDecrease: z.coerce.number().gte(0).lt(1, {
      message: "Annual margin decrease must be between 0 and 1",
    }),
    annualSalesDecayMin: z.coerce.number(),
    annualSalesDecayMode: z.coerce.number(),
    annualSalesDecayMax: z.coerce.number(),
    taxRate: z.coerce.number().gte(0).lt(1, {
      message: "Tax rate must be between 0 and 1",
    }),
    discountRate: z.coerce.number().gte(0).lt(1, {
      message: "Discount rate must be between 0 and 1",
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
        0,
      ),
    {
      message: "Year one sales must fit a triangular distribution",
      path: ["yearOneSalesMin"],
    },
  )
  .refine(
    (fields) =>
      //   annualSalesDecay must fit a triangular distribution or be all zero
      isTriangular(
        fields.annualSalesDecayMin,
        fields.annualSalesDecayMode,
        fields.annualSalesDecayMax,
        0,
      ) ||
      isAllZero(
        fields.annualSalesDecayMin,
        fields.annualSalesDecayMode,
        fields.annualSalesDecayMax,
      ),
    {
      message:
        "Annual sales decay must fit a triangular distribution or be all zero",
      path: ["annualSalesDecayMin"],
    },
  );
export default function FinanceForm() {
  const router = useRouter();
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fixedCost: 0,
      yearOneMargin: 0,
      yearOneSalesMin: 0,
      yearOneSalesMode: 0,
      yearOneSalesMax: 0,
      annualMarginDecrease: 0,
      annualSalesDecayMin: 0,
      annualSalesDecayMode: 0,
      annualSalesDecayMax: 0,
      taxRate: 0,
      discountRate: 0,
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
    <>
      <FinanceInstructions />
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
          <FormLabel>Annual Margin Decrease (set to 0 to ignore)</FormLabel>
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
          <FormLabel>Annual Sales Decay Min (set to 0 to ignore)</FormLabel>
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
          <FormLabel>Annual Sales Decay Mode (set to 0 to ignore)</FormLabel>
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
          <FormLabel>Annual Sales Decay Max (set to 0 to ignore)</FormLabel>
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
    </>
  );
}
