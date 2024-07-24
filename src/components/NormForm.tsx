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

const formSchema = z.object({
  distMean: z.coerce.number({
    required_error: "Mean is required",
    invalid_type_error: "Mean must be a number",
  }),
  distSD: z.coerce.number({
    required_error: "Standard deviation is required",
    invalid_type_error: "Standard deviation must be > 0",
  }),
});

export default function NormForm() {
  const router = useRouter();
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      distMean: undefined,
      distSD: undefined,
    },
  });

  // define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { distMean, distSD } = values;
    router.push(`/results/normal?distMean=${distMean}&distSD=${distSD}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <FormField
          control={form.control}
          name="distMean"
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
          name="distSD"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Standard Deviation</FormLabel>
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
