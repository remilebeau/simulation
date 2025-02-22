export default function SimulationInstructions() {
  return (
    <article className="flex flex-col gap-4 rounded-xl border p-4 text-center font-bold">
      <ul className="flex flex-col italic text-blue-500">
        <li>
          profit = salesRevenue + salvageRevenue - productionCosts -
          <var className="text-red-500"> fixedCosts</var>
        </li>
        <li>
          salesRevenue = <var className="text-green-500">unitsSold </var> *
          <var className="text-red-500"> unitPrice</var>
        </li>
        <li>
          salvageRevenue = <var className="text-green-500">unitsSalvaged </var>*{" "}
          <var className="text-red-500"> salvagePrice</var>
        </li>
        <li>
          productionCosts =
          <var className="text-red-500"> productionQuantity</var> *
          <var className="text-red-500"> unitCost</var>
        </li>
      </ul>
      <ul className="flex flex-col justify-evenly italic">
        <li className="text-blue-500">Calculated value</li>
        <li className="text-green-500">Simulated value</li>
        <li className="text-red-500">Assumed value</li>
      </ul>
      <p>
        Enter the <var className="text-red-500">Assumed values </var>below
      </p>

      <p>The simulation provides insight about the scenario, such as:</p>

      <ul className="flex flex-col justify-evenly gap-4 text-left sm:flex-row">
        <ul className="flex flex-col">
          <li>What is the expected profit?</li>
          <li>What is the highest profit observed?</li>
          <li>What is the chance of a profit over $X?</li>
          <li>Which inputs affect profit the most?</li>
        </ul>
        <ul className="flex-flex-col">
          <li>Which inputs affect profit the least?</li>
          <li>What is the value at risk?</li>
          <li>What is the lowest profit observed?</li>
          <li>What is the chance of a profit under $X?</li>
        </ul>
      </ul>
    </article>
  );
}
