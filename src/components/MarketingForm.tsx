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
import MarketingInstructions from "./MarketingInstructions";

// define form schema

const formSchema = z.object({
  retentionRate: z.coerce.number(),
  discountRate: z.coerce.number(),
  stDev: z.coerce.number(),
  yearOneMeanProfit: z.coerce.number(),
  yearTwoMeanProfit: z.coerce.number(),
  yearThreeMeanProfit: z.coerce.number(),
  yearFourMeanProfit: z.coerce.number(),
  yearFiveMeanProfit: z.coerce.number(),
});

export default function MarketingForm() {
  const router = useRouter();
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      retentionRate: undefined,
      discountRate: undefined,
      stDev: undefined,
      yearOneMeanProfit: undefined,
      yearTwoMeanProfit: undefined,
      yearThreeMeanProfit: undefined,
      yearFourMeanProfit: undefined,
      yearFiveMeanProfit: undefined,
    },
  });

  // define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      retentionRate,
      discountRate,
      stDev,
      yearOneMeanProfit,
      yearTwoMeanProfit,
      yearThreeMeanProfit,
      yearFourMeanProfit,
      yearFiveMeanProfit,
    } = values;
    router.push(
      `/results/marketing?retentionRate=${retentionRate}&discountRate=${discountRate}&stDev=${stDev}&yearOneMeanProfit=${yearOneMeanProfit}&yearTwoMeanProfit=${yearTwoMeanProfit}&yearThreeMeanProfit=${yearThreeMeanProfit}&yearFourMeanProfit=${yearFourMeanProfit}&yearFiveMeanProfit=${yearFiveMeanProfit}`,
    );
  }

  return (
    <>
      <MarketingInstructions />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4"
        >
          <FormLabel>Retention Rate</FormLabel>
          <FormField
            control={form.control}
            name="retentionRate"
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

          <FormLabel>Standard Deviation (as % of mean profit)</FormLabel>
          <FormField
            control={form.control}
            name="stDev"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel>Year One Mean Profit</FormLabel>
          <FormField
            control={form.control}
            name="yearOneMeanProfit"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel>Year Two Mean Profit</FormLabel>
          <FormField
            control={form.control}
            name="yearTwoMeanProfit"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel>Year Three Mean Profit</FormLabel>
          <FormField
            control={form.control}
            name="yearThreeMeanProfit"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel>Year Four Mean Profit</FormLabel>
          <FormField
            control={form.control}
            name="yearFourMeanProfit"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel>Year Five Mean Profit</FormLabel>
          <FormField
            control={form.control}
            name="yearFiveMeanProfit"
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
    </>
  );
}
