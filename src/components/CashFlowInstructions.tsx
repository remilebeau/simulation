export default function CashFlowInstructions() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="font-bold">Cash Flow Model Parameters</h2>
      <p>
        <b>Periods per Year:</b> The number of periods per year.
      </p>
      <p>
        <b>Total Annual Fixed Costs:</b> The total annual fixed costs for the
        year.
      </p>
      <p>
        <b>Distribution of Periodic Cash Flows:</b> The distribution of periodic
        cash flows. Follows a triangular, truncated normal, uniform, or normal
        distribution.
      </p>
    </section>
  );
}
