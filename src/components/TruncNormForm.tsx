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
import { isTriangular } from "@/lib/validation";

// define form schema

const formSchema = z
  .object({
    distMin: z.coerce.number(),
    distMean: z.coerce.number(),
    distMax: z.coerce.number(),
    distSD: z.coerce.number().gte(0, {
      message: "Standard deviation must be greater than or equal to 0",
    }),
  })
  .refine(
    (fields) =>
      isTriangular(fields.distMin, fields.distMean, fields.distMax, 0),
    {
      message: "Please check that: 1) min <= mode <= max 2) min < max",
      path: ["distMin"],
    },
  );

export default function TruncatedNormalForm() {
  const router = useRouter();
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      distMin: 0,
      distMean: 0,
      distMax: 0,
      distSD: 0,
    },
  });

  // define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { distMin, distMean, distMax, distSD } = values;
    router.push(
      `/results/truncnorm?distMin=${distMin}&distMean=${distMean}&distMax=${distMax}&distSD=${distSD}`,
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
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
        <FormLabel>Mean</FormLabel>
        <FormField
          control={form.control}
          name="distMean"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
