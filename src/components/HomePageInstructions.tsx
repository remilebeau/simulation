export default function HomePageInstructions() {
  return (
    <article className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 p-4">
        <p>
          Input the parameters of your production scenario. The scenario will be
          simulated 1000 times, and the results will be summarized in a
          histogram.
        </p>
        <p>
          From this histogram, we can answer the following questions about our
          scenario:
        </p>
        <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
          <li>What is the expected profit?</li>
          <li>What is the chance of a profit above a required value?</li>
          <li>What was the lowest profit observed?</li>
          <li>What was the highest profit observed?</li>
          <li>What is the risk of losing money?</li>
          <li>What is the value at risk?</li>
        </ul>
      </section>
      <section className="flex flex-col gap-4 p-4">
        <p>
          A key factor in Monte Carlo simulation is the choice of probability
          distribution for any random variables, such as demand. Although demand
          is random, thanks to our historical data, industry knowledge, and
          conversations with our sales and marketing team, we typically have{" "}
          <i>some</i> idea of the randomness.
        </p>
        <p>This app accepts the following distributions:</p>
        <ul className="flex flex-col gap-4 p-4 sm:grid sm:grid-cols-2">
          <li>
            <img src="/normal.png" alt="Normal Distribution" />
          </li>
          <li>
            <img src="/triangular.png" alt="Triangular Distribution" />
          </li>
          <li>
            <img
              src="/truncatedNormal.png"
              alt="Truncated Normal Distribution"
            />
          </li>
          <li>
            <img src="/uniform.png" alt="Uniform Distribution" />
          </li>
        </ul>
      </section>
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
    </article>
  );
}
