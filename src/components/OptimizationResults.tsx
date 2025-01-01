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
    <>
      <p>Total staff required: {objFuncVal}</p>
      <section className="flex flex-row gap-4 sm:grid sm:grid-cols-2">
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
          <p>Monday staff: {mondayStaff}</p>
          <p>Tuesday staff: {tuesdayStaff}</p>
          <p>Wednesday staff: {wednesdayStaff}</p>
          <p>Thursday staff: {thursdayStaff}</p>
          <p>Friday staff: {fridayStaff}</p>
          <p>Saturday staff: {saturdayStaff}</p>
          <p>Sunday staff: {sundayStaff}</p>
        </div>
      </section>
    </>
  );
}
