export default function OptimizationInstructions() {
  return (
    <section className="flex flex-col gap-4 rounded-xl border p-4">
      <p>
        Enter the number of staff required for each day of the week. The solver
        will find the combination of staff for each of the 7 possible work weeks
        (Monday to Friday, Tuesday to Saturday, etc.) that minimizes the number
        of staff, subject to the staffing requirements.
      </p>
    </section>
  );
}
