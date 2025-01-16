export default function SimulationInstructions() {
  return (
    <article className="flex flex-col rounded-xl border p-4">
      <p className="mb-2">
        Model a production planning scenario with the inputs below. The model
        will be simulated 1000 times, and the resulting 1000 profits will be
        summarized in a histogram.
      </p>
      <p className="mb-2">
        The model and histogram provide insight about the scenario, such as:
      </p>
      <ul className="flex flex-col gap-x-2 sm:grid sm:grid-cols-2">
        <div className="flex flex-col">
          <li>What is the expected profit?</li>
          <li>What is the highest profit observed?</li>
          <li>What is the chance of a profit higher than $X?</li>
          <li>How sensitive is the profit to changes in the inputs?</li>
        </div>
        <div className="flex-flex-col">
          <li>What is the value at risk?</li>
          <li>What is the lowest profit observed?</li>
          <li>What is the chance of a profit less than $X?</li>
        </div>
      </ul>
    </article>
  );
}
