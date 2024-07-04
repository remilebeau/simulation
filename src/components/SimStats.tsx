type Props = {
  minProfit: number;
  maxProfit: number;
  meanProfit: number;
  lowerCI: number;
  upperCI: number;
  q1: number;
  q2: number;
  q3: number;
  pLoseMoneyLowerCI: number;
  pLoseMoneyUpperCI: number;
};

export default function SimStats({
  minProfit,
  maxProfit,
  meanProfit,
  lowerCI,
  upperCI,
  q1,
  q2,
  q3,
  pLoseMoneyLowerCI,
  pLoseMoneyUpperCI,
}: Props) {
  return (
    <article className="flex w-full flex-col rounded-md border p-2 font-bold">
      <h2 className="text-center">Simulation Statistics</h2>
      <section id="min" className="flex flex-row justify-between">
        <p>Minimum:</p>
        <p>{minProfit.toLocaleString("en-US")}</p>
      </section>
      <section id="25p" className="flex flex-row justify-between">
        <p>25th Percentile:</p>
        <p>{q1.toLocaleString("en-US")}</p>
      </section>
      <section id="mean" className="flex flex-row justify-between">
        <p>Mean:</p>
        <p>{meanProfit.toLocaleString("en-US")}</p>
      </section>
      <section id="ci" className="flex flex-row justify-between text-right">
        <p className="text-left">95% Confidence Interval for Mean:</p>
        <p>
          [{lowerCI.toLocaleString("en-US")} to{" "}
          {upperCI.toLocaleString("en-US")}]
        </p>
      </section>
      <section id="50p" className="flex flex-row justify-between">
        <p>Median:</p>
        <p>{q2.toLocaleString("en-US")}</p>
      </section>
      <section id="75p" className="flex flex-row justify-between">
        <p>75th Percentile:</p>
        <p>{q3.toLocaleString("en-US")}</p>
      </section>
      <section id="max" className="flex flex-row justify-between">
        <p>Maximum:</p>
        <p>{maxProfit.toLocaleString("en-US")}</p>
      </section>
      <section id="pLoseMoney" className="flex flex-row justify-between">
        <p>Probability of Losing Money:</p>
        <p>
          [{pLoseMoneyLowerCI.toLocaleString("en-US")} to{" "}
          {pLoseMoneyUpperCI.toLocaleString("en-US")}]
        </p>
      </section>
    </article>
  );
}
