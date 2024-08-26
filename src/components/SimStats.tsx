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
    <article className="flex w-full flex-col rounded-md border border-border p-4 font-bold">
      <h2 className="text-center text-xl">Simulation Statistics</h2>
      <section id="mean" className="flex flex-row justify-between">
        <p className="text-md">Mean:</p>
        <p className="text-md">
          {meanProfit.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </p>
      </section>
      <section id="standardError" className="flex flex-row justify-between">
        <p className="text-md">Standard Error:</p>
        <p className="text-md">
          {meanStandardError.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </p>
      </section>
      <section id="ci" className="flex flex-row justify-between text-right">
        <p className="text-md">95% Confidence Interval for Mean:</p>
        <p className="text-md">
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
        <p className="text-md">Probability of Losing Money:</p>
        <p className="text-md">
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
        <p className="text-md">Value at Risk at 5% Level:</p>
        <p className="text-md">
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
