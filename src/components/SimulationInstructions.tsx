export default function SimulationInstructions() {
  return (
    <article className="flex flex-col rounded-xl border p-4">
      <p className="mb-2">
        Model a production planning scenario with the form below.
      </p>
      <p className="mb-2">
        The simulation provides insight about the scenario, such as:
      </p>
      <ul className="flex flex-col gap-x-2 sm:grid sm:grid-cols-2">
        <div className="flex flex-col">
          <li>What is the expected profit?</li>
          <li>What is the highest profit observed?</li>
          <li>What is the chance of a profit over $X?</li>
          <li>Which inputs affect profit the most?</li>
        </div>
        <div className="flex-flex-col">
          <li>Which inputs affect profit the least?</li>
          <li>What is the value at risk?</li>
          <li>What is the lowest profit observed?</li>
          <li>What is the chance of a profit under $X?</li>
        </div>
      </ul>
    </article>
  );
}
