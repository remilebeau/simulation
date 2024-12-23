type Props = {
  objFuncVal: number;
  xMonday: number;
  xTuesday: number;
  xWednesday: number;
  xThursday: number;
  xFriday: number;
  xSaturday: number;
  xSunday: number;
};

export default function OptimizationResults({
  objFuncVal,
  xMonday,
  xTuesday,
  xWednesday,
  xThursday,
  xFriday,
  xSaturday,
  xSunday,
}: Props) {
  return (
    <section>
      <p>Minimum number of staff required: {objFuncVal}</p>
      <p>Number of Monday to Friday staff: {xMonday}</p>
      <p>Number of Tuesday to Saturday staff: {xTuesday}</p>
      <p>Number of Wednesday to Sunday staff: {xWednesday}</p>
      <p>Number of Thursday to Monday staff: {xThursday}</p>
      <p>Number of Friday to Tuesday staff: {xFriday}</p>
      <p>Number of Saturday to Wednesday staff: {xSaturday}</p>
      <p>Number of Sunday to Thursday staff: {xSunday}</p>
    </section>
  );
}
