export default function ProductionInstructions() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="font-bold">Production Planning Model Parameters</h2>
      <p>
        <b>Unit Cost:</b> The variable costs per unit.
      </p>
      <p>
        <b>Unit Price:</b> The sell price per unit.
      </p>
      <p>
        <b>Salvage Price:</b> The salvage value for each unit produced above
        demand.
      </p>
      <p>
        <b>Demand Distribution</b>: The expected distribution of demand. Demand
        is typically forecasted using historical data, industry knowledge,
        conversations with the sales and marketing team, and other means. This
        model accepts triangular, normal, uniform, or truncated normal demand
        distributions.
      </p>
      <p>
        <b>Fixed Costs:</b> The total fixed costs of the production.
      </p>
      <p>
        <b>Production Quantity:</b> The number of units to be produced.
      </p>
    </section>
  );
}
