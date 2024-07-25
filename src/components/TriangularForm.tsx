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
    distMin: z.coerce.number({
      required_error: "Min value is required",
      invalid_type_error: "Min value must be a number",
    }),
    distMode: z.coerce.number({
      required_error: "Mode value is required",
      invalid_type_error: "Mode value must be a number",
    }),
    distMax: z.coerce.number({
      required_error: "Max value is required",
      invalid_type_error: "Max value must be a number",
    }),
  })
  .refine(
    (fields) =>
      fields.distMin <= fields.distMode &&
      fields.distMode <= fields.distMax &&
      fields.distMin < fields.distMax,
    {
      message: "Please check that: 1) min <= mode <= max and 2) min < max",
      path: ["distMin"],
    },
  );

export default function TriangularForm() {
  const router = useRouter();
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      distMin: 0,
      distMode: 0,
      distMax: 0,
    },
  });

  // define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { distMin, distMode, distMax } = values;
    router.push(
      `/results/triangular?distMin=${distMin}&distMode=${distMode}&distMax=${distMax}`,
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <FormField
          control={form.control}
          name="distMin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="distMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mean</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="distMax"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum</FormLabel>
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
