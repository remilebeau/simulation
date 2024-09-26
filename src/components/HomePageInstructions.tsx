export default function HomePageInstructions() {
  return (
    <section className="flex flex-col gap-4">
      <p>
        Input the parameters of your production scenario. The scenario will be
        simulated 1000 times, and the resulting 1000 profits will be summarized
        in a histogram.
      </p>
      <p>
        From this histogram, we can answer the following questions about our
        scenario:
      </p>
      <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
        <li>What is the expected profit?</li>
        <li>What is the chance of a profit above a required amount?</li>
        <li>What was the lowest profit observed?</li>
        <li>What was the highest profit observed?</li>
        <li>What is the chance of a negative profit?</li>
        <li>What is the value at risk?</li>
      </ul>
      <p>
        Although demand is random, thanks to our historical data, industry
        knowledge, conversations with our sales and marketing team, and other
        means, we typically have <i>some</i> idea of the randomness.
      </p>
      <p>
        To download the raw output data for your own analysis, please visit the{" "}
        <a
          href="https://simulation-api-rsaw.onrender.com/docs"
          rel="noreferrer"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          API docs.
        </a>
      </p>
    </section>
  );
}
