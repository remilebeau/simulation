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
import optimization from "@/lib/optimization";
import OptimizationResults from "@/components/OptimizationResults";
import Loader from "@/components/Loader";

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
  const [xMondayFriday, setXMondayFriday] = useState(0);
  const [xTuesdaySaturday, setXTuesdaySaturday] = useState(0);
  const [xWednesdaySunday, setXWednesdaySunday] = useState(0);
  const [xThursdayMonday, setXThursdayMonday] = useState(0);
  const [xFridayTuesday, setXFridayTuesday] = useState(0);
  const [xSaturdayWednesday, setXSaturdayWednesday] = useState(0);
  const [xSundayThursday, setXSundayThursday] = useState(0);
  const [mondayStaff, setMondayStaff] = useState(0);
  const [tuesdayStaff, setTuesdayStaff] = useState(0);
  const [wednesdayStaff, setWednesdayStaff] = useState(0);
  const [thursdayStaff, setThursdayStaff] = useState(0);
  const [fridayStaff, setFridayStaff] = useState(0);
  const [saturdayStaff, setSaturdayStaff] = useState(0);
  const [sundayStaff, setSundayStaff] = useState(0);

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
      xMondayFriday,
      xTuesdaySaturday,
      xWednesdaySunday,
      xThursdayMonday,
      xFridayTuesday,
      xSaturdayWednesday,
      xSundayThursday,
      mondayStaff,
      tuesdayStaff,
      wednesdayStaff,
      thursdayStaff,
      fridayStaff,
      saturdayStaff,
      sundayStaff,
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
    setXMondayFriday(xMondayFriday);
    setXTuesdaySaturday(xTuesdaySaturday);
    setXWednesdaySunday(xWednesdaySunday);
    setXThursdayMonday(xThursdayMonday);
    setXFridayTuesday(xFridayTuesday);
    setXSaturdayWednesday(xSaturdayWednesday);
    setXSundayThursday(xSundayThursday);
    setMondayStaff(mondayStaff);
    setTuesdayStaff(tuesdayStaff);
    setWednesdayStaff(wednesdayStaff);
    setThursdayStaff(thursdayStaff);
    setFridayStaff(fridayStaff);
    setSaturdayStaff(saturdayStaff);
    setSundayStaff(sundayStaff);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && objFuncVal && (
        <OptimizationResults
          objFuncVal={objFuncVal}
          xMondayFriday={xMondayFriday}
          xTuesdaySaturday={xTuesdaySaturday}
          xWednesdaySunday={xWednesdaySunday}
          xThursdayMonday={xThursdayMonday}
          xFridayTuesday={xFridayTuesday}
          xSaturdayWednesday={xSaturdayWednesday}
          xSundayThursday={xSundayThursday}
          mondayStaff={mondayStaff}
          tuesdayStaff={tuesdayStaff}
          wednesdayStaff={wednesdayStaff}
          thursdayStaff={thursdayStaff}
          fridayStaff={fridayStaff}
          saturdayStaff={saturdayStaff}
          sundayStaff={sundayStaff}
        />
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
                      placeholder="Number of staff required every Monday"
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
                      placeholder="Number of staff required every Tuesday"
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
                      placeholder="Number of staff required every Wednesday"
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
                      placeholder="Number of staff required every Thursday"
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
                      placeholder="Number of staff required every Friday"
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
                      placeholder="Number of staff required every Saturday"
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
                      placeholder="Number of staff required every Sunday"
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
