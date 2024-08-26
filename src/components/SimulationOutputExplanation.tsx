export default function SimulationOutputExplanation() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2>Explanation of Simulation Output</h2>
      <p>
        The model was run 1000 times. Each run outputs a profit value. The
        histogram above is a plot of those 1000 profit values. From this
        histogram, we can extract the following information:
      </p>
      <p>
        <b>Mean:</b> The mean profit.
      </p>
      <p>
        <b>Standard error:</b> The standard error of the mean profit. A larger
        standard error creates a wider confidence interval.
      </p>
      <p>
        <b>Mean CI:</b> The 95% confidence interval for the mean profit. With
        95% confidence, the mean profit is within this interval.
      </p>
      <p>
        <b>Probability of Losing Money:</b> The 95% confidence interval for the
        probability of losing money. With 95% confidence, the probability of
        losing money is within this interval.
      </p>
      <p>
        <b>Value at Risk:</b> The value at risk at the 5% level. The probability
        of losing at least this much money is 5%.
      </p>
    </section>
  );
}
