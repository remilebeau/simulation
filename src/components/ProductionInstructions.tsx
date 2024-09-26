export default function ProductionInstructions() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold">Production Planning Model Parameters</h2>
      <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
        <li>
          <b>Unit Cost:</b> The variable costs per unit.
        </li>
        <li>
          <b>Unit Price:</b> The sell price per unit.
        </li>
        <li>
          <b>Salvage Price:</b> The salvage value for each unit produced above
          demand.
        </li>
        <li>
          <b>Demand Distribution:</b> The expected distribution of demand.
        </li>
        <li>
          <b>Fixed Costs:</b> The total fixed costs of the production.
        </li>
        <li>
          <b>Production Quantity:</b> The number of units to be produced.
        </li>
      </ul>
    </section>
  );
}
