import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import optimization from "@/lib/optimization";
import OptimizationResults from "@/components/OptimizationResults";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import OptimizationInstructions from "@/components/OptimizationInstructions";
import FieldWithLabel from "@/components/FieldWithLabel";

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

export default function OptimizationForm() {
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
      sunday
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
      {!isLoading && !objFuncVal && <OptimizationInstructions />}
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
            className="flex flex-col gap-4 rounded-xl border  p-4"
          >
            <FieldWithLabel
              label="Monday"
              name="monday"
              placeholder="Staff required every Monday"
            />
            <FieldWithLabel
              label="Tuesday"
              name="tuesday"
              placeholder="Staff required every Tuesday"
            />
            <FieldWithLabel
              label="Wednesday"
              name="wednesday"
              placeholder="Staff required every Wednesday"
            />
            <FieldWithLabel
              label="Thursday"
              name="thursday"
              placeholder="Staff required every Thursday"
            />
            <FieldWithLabel
              label="Friday"
              name="friday"
              placeholder="Staff required every Friday"
            />
            <FieldWithLabel
              label="Saturday"
              name="saturday"
              placeholder="Staff required every Saturday"
            />
            <FieldWithLabel
              label="Sunday"
              name="sunday"
              placeholder="Staff required every Sunday"
            />

            <Button className="rounded-xl" type="submit">
              Minimize
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
