export default function ProductionInstructions() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-center text-2xl">
        Production Model Parameters Explained
      </h2>
      <p>
        <b>Unit cost:</b> The variable costs per unit
      </p>
      <p>
        <b>Unit price:</b> The sell price per unit
      </p>
      <p>
        <b>Salvage price:</b> The salvage value for each unit produced above
        demand
      </p>
      <p>
        <b>Demand Distribution</b> The expected distribution of demand. Demand
        is typically forecasted using historical data, industry knowledge,
        conversations with the sales and marketing team, and other means. This
        model accepts triangular, normal, uniform, or truncated normal demand
        distributions.
      </p>
      <p>
        <b>Fixed costs:</b> The total fixed costs of the production
      </p>
      <p>
        <b>Production Quantity:</b> The number of units to be produced
      </p>
    </section>
  );
}
