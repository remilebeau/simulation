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
      <h2 className="text-center text-2xl">Simulation Statistics</h2>
      <section id="mean" className="flex flex-row justify-between">
        <p className="text-xl">Mean:</p>
        <p className="text-xl">
          {meanProfit.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </p>
      </section>
      <section id="standardError" className="flex flex-row justify-between">
        <p className="text-xl">Standard Error:</p>
        <p className="text-xl">
          {meanStandardError.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </p>
      </section>
      <section id="ci" className="flex flex-row justify-between text-right">
        <p className="text-xl">95% Confidence Interval for Mean:</p>
        <p className="text-xl">
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
        <p className="text-xl">Probability of Losing Money:</p>
        <p className="text-xl">
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
        <p className="text-xl">Value at Risk at 5% Level:</p>
        <p className="text-xl">
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
