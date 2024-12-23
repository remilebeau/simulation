"use client";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import optimization from "@/lib/optimization";

// define form schema

const formSchema = z.object({
  monday: z.coerce.number().gte(0),
  tuesday: z.coerce.number().gte(0),
  wednesday: z.coerce.number().gte(0),
  thursday: z.coerce.number().gte(0),
  friday: z.coerce.number().gte(0),
  saturday: z.coerce.number().gte(0),
  sunday: z.coerce.number().gte(0),
});

export default function ProductionForm() {
  // define state for simulation results
  const [objFuncVal, setObjFuncVal] = useState<number | undefined>(undefined);
  const [xMonday, setXMonday] = useState(0);
  const [xTuesday, setXTuesday] = useState(0);
  const [xWednesday, setXWednesday] = useState(0);
  const [xThursday, setXThursday] = useState(0);
  const [xFriday, setXFriday] = useState(0);
  const [xSaturday, setXSaturday] = useState(0);
  const [xSunday, setXSunday] = useState(0);

  // define loading state
  const [isLoading, setIsLoading] = useState(false);

  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monday: undefined,
      tuesday: undefined,
      wednesday: undefined,
      thursday: undefined,
      friday: undefined,
      saturday: undefined,
      sunday: undefined,
    },
  });

  // define submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
      values;
    const {
      objFuncVal,
      xMonday,
      xTuesday,
      xWednesday,
      xThursday,
      xFriday,
      xSaturday,
      xSunday,
    } = await optimization(
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    );
    setObjFuncVal(objFuncVal);
    setXMonday(xMonday);
    setXTuesday(xTuesday);
    setXWednesday(xWednesday);
    setXThursday(xThursday);
    setXFriday(xFriday);
    setXSaturday(xSaturday);
    setXSunday(xSunday);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && (
        <section className="flex flex-col items-center gap-4">
          <LoaderCircle className="size-16 animate-spin" />
          <h1 className="text-3xl font-bold">Loading...</h1>
          <h2 className="text-2xl font-bold">
            The first request may take up to 30 seconds...
          </h2>
        </section>
      )}
      {!isLoading && objFuncVal && (
        <section>
          <p>Minimum number of staff required: {objFuncVal}</p>
          <p>Number of Monday to Friday workers: {xMonday}</p>
          <p>Number of Tuesday to Saturday workers: {xTuesday}</p>
          <p>Number of Wednesday to Sunday workers: {xWednesday}</p>
          <p>Number of Thursday to Monday workers: {xThursday}</p>
          <p>Number of Friday to Tuesday workers: {xFriday}</p>
          <p>Number of Saturday to Wednesday workers: {xSaturday}</p>
          <p>Number of Sunday to Thursday workers: {xSunday}</p>
        </section>
      )}
      {!isLoading && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-xl border border-white p-4"
          >
            <FormLabel>Monday</FormLabel>
            <FormField
              control={form.control}
              name="monday"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Number of workers needed every Monday"
                      className="bg-black text-white"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Tuesday</FormLabel>
            <FormField
              control={form.control}
              name="tuesday"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Number of workers needed every Tuesday"
                      className="bg-black text-white"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormLabel>Wednesday</FormLabel>
            <FormField
              control={form.control}
              name="wednesday"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Number of workers needed every Wednesday"
                      className="bg-black text-white"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormLabel>Thursday</FormLabel>
            <FormField
              control={form.control}
              name="thursday"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Number of workers needed every Thursday"
                      className="bg-black text-white"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormLabel>Friday</FormLabel>
            <FormField
              control={form.control}
              name="friday"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Number of workers needed every Friday"
                      className="bg-black text-white"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormLabel>Saturday</FormLabel>
            <FormField
              control={form.control}
              name="saturday"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Number of workers needed every Saturday"
                      className="bg-black text-white"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormLabel>Sunday</FormLabel>
            <FormField
              control={form.control}
              name="sunday"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Number of workers needed every Sunday"
                      className="bg-black text-white"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              className="w-full rounded-xl bg-white p-4 font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Form>
      )}
    </>
  );
}
