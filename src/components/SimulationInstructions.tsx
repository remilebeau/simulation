export default function SimulationInstructions() {
  return (
    <article className="flex flex-col gap-4 rounded-xl p-4 text-center font-bold">
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
      <ul className="mx-auto flex flex-col italic sm:flex-row sm:gap-12">
        <li className="text-blue-500">Calculated value</li>
        <li className="text-green-500">Simulated value</li>
        <li className="text-red-500">Assumed value</li>
      </ul>
      <p>
        Enter the <var className="text-red-500">Assumed values </var>below:
      </p>
    </article>
  );
}
