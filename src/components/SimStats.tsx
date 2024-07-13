type Props = {
  meanProfit: number;
  meanStandardError: number;
  meanLowerCI: number;
  meanUpperCI: number;
  pLoseMoneyLowerCI: number;
  pLoseMoneyUpperCI: number;
  valueAtRisk: number;
};

export default function SimStats({
  meanProfit,
  meanStandardError,
  meanLowerCI,
  meanUpperCI,
  pLoseMoneyLowerCI,
  pLoseMoneyUpperCI,
  valueAtRisk,
}: Props) {
  return (
    <article className="flex w-full flex-col rounded-md border p-2 font-bold">
      <h2 className="text-center">Simulation Statistics</h2>
      <section id="mean" className="flex flex-row justify-between">
        <p>Mean:</p>
        <p>
          {meanProfit.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </p>
      </section>
      <section id="standardError" className="flex flex-row justify-between">
        <p>Standard Error:</p>
        <p>
          {meanStandardError.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </p>
      </section>
      <section id="ci" className="flex flex-row justify-between text-right">
        <p className="text-left">95% Confidence Interval for Mean:</p>
        <p>
          [
          {meanLowerCI.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}{" "}
          to{" "}
          {meanUpperCI.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
          ]
        </p>
      </section>
      <section id="pLoseMoney" className="flex flex-row justify-between">
        <p>95% Confidence Interval for Probability of Losing Money:</p>
        <p>
          [
          {pLoseMoneyLowerCI.toLocaleString("en-US", {
            style: "percent",
          })}{" "}
          to{" "}
          {pLoseMoneyUpperCI.toLocaleString("en-US", {
            style: "percent",
          })}
          ]
        </p>
      </section>
      <section id="valueAtRisk" className="flex flex-row justify-between">
        <p>Value at Risk:</p>
        <p>
          {valueAtRisk.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </p>
      </section>
    </article>
  );
}
