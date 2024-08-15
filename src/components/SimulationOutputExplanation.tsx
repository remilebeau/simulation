export default function SimulationOutputExplanation() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2>Explanation of Simulation Output</h2>
      <p>
        The histogram above is a plot of the 1000 simulated profit values that
        were generated when running this model 1000 times. From this histogram,
        we can extract the following information:
      </p>
      <p>
        <b>Mean:</b> The expected profit
      </p>
      <p>
        <b>Standard error:</b> The standard error of the expected profit
      </p>
      <p>
        <b>95% Confidence Interval for Mean:</b> The 95% confidence interval for
        the expected profit. We are 95% confident that the expected profit will
        fall within this interval. Note: This is the confidence interval for the
        MEAN or EXPECTED profit. This does NOT mean that there is a 95% chance
        the profit from a single simulation will fall within this interval.
      </p>
      <p>
        <b>Probability of Losing Money:</b> The 95% confidence interval for the
        probability of losing money. This is calculated by counting the number
        of simulations that resulted in a negative profit and dividing that
        number by the total number of simulations, which in our case is 1000.
        For example, if 200 profit values were below 0, then the probability of
        losing money is approximately 20%. From this point estimate, we can also
        calculate a 95% confidence interval. We are 95% confident that the
        probability of losing money will fall within this interval.
      </p>
      <p>
        <b>Value at Risk at 5% Level:</b> The value at risk at the 5% level. If
        we are extremely unlucky, and find ourselves among the 5% worst
        outcomes, we are looking at a loss of at least this much money.
      </p>
    </section>
  );
}
