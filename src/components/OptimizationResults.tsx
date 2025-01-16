type Props = {
  objFuncVal: number;
  xMondayFriday: number;
  xTuesdaySaturday: number;
  xWednesdaySunday: number;
  xThursdayMonday: number;
  xFridayTuesday: number;
  xSaturdayWednesday: number;
  xSundayThursday: number;
  mondayStaff: number;
  tuesdayStaff: number;
  wednesdayStaff: number;
  thursdayStaff: number;
  fridayStaff: number;
  saturdayStaff: number;
  sundayStaff: number;
};

export default function OptimizationResults({
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
}: Props) {
  return (
    <section className="bg-background flex flex-col gap-4 rounded-xl border  p-4">
      <p className="text-center font-bold sm:text-xl">
        Total staff required: {objFuncVal}
      </p>
      <section className="mx-auto flex flex-row gap-8 sm:grid sm:grid-cols-2 sm:text-xl">
        <div>
          <p>Mon to Fri staff: {xMondayFriday}</p>
          <p>Tue to Sat staff: {xTuesdaySaturday}</p>
          <p>Wed to Sun staff: {xWednesdaySunday}</p>
          <p>Thu to Mon staff: {xThursdayMonday}</p>
          <p>Fri to Tue staff: {xFridayTuesday}</p>
          <p>Sat to Wed staff: {xSaturdayWednesday}</p>
          <p>Sun to Thu staff: {xSundayThursday}</p>
        </div>
        <div>
          <p>Mon available: {mondayStaff}</p>
          <p>Tue available: {tuesdayStaff}</p>
          <p>Wed available: {wednesdayStaff}</p>
          <p>Thu available: {thursdayStaff}</p>
          <p>Fri available: {fridayStaff}</p>
          <p>Sat available: {saturdayStaff}</p>
          <p>Sun available: {sundayStaff}</p>
        </div>
      </section>
    </section>
  );
}
