export default function SimulationOutputExplanation() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="font-bold">Explanation of Simulation Output</h2>
      <p>
        <b>Mean:</b> The mean profit.
      </p>
      <p>
        <b>Standard Error:</b> The standard error of the mean profit. A larger
        standard error creates a wider confidence interval.
      </p>
      <p>
        <b>Mean CI:</b> The 95% confidence interval for the mean profit. With
        95% confidence, the mean profit is within this interval.
      </p>
      <p>
        <b>P(Lose Money):</b> The 95% confidence interval for the probability of
        losing money. With 95% confidence, the probability of losing money is
        within this interval.
      </p>
      <p>
        <b>VaR:</b> The value at risk at the 5% level. The probability of losing
        at least this much money is 5%.
      </p>
    </section>
  );
}
