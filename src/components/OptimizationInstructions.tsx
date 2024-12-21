export default function OptimizationInstructions() {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-white p-4">
      <p>
        Enter the minimum number of staff required for each day of the week. The
        model will find the combination of staff for each of the 7 possible work
        weeks (Monday to Friday, Tuesday to Saturday, etc.) that will minimize
        the total number of required staff.
      </p>
    </section>
  );
}
