export default function HomePageInstructions() {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-white p-4">
      <p>
        Input the parameters of your production scenario. The scenario will be
        simulated 1000 times, and the resulting 1000 profits will be summarized
        in a histogram.
      </p>
      <p>
        From this histogram, we can gain insight about our scenario, such as:
      </p>
      <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
        <section className="flex flex-col">
          <li>What is the expected profit?</li>
          <li>What is the chance of a profit higher than $X?</li>
          <li>What is the chance of a profit between $X and $Y?</li>
          <li>What is the highest profit observed?</li>
        </section>
        <section className="flex flex-col">
          <li>What is the lowest profit observed?</li>
          <li>What is the chance of a negative profit?</li>
          <li>What is the chance of a profit less than $X?</li>
        </section>
      </ul>
      <p>
        Although demand is random, thanks to our historical data, industry
        knowledge, conversations with our sales and marketing team, and other
        means, we typically have <i>some</i> idea of the randomness.
      </p>
    </section>
  );
}
