type Props = {
  minimum: number;
  valueAtRisk: number;
  q1: number;
  mean: number;
  meanLowerCI: number;
  meanUpperCI: number;
  median: number;
  q3: number;
  maximum: number;
  pLoseMoney: number;
  pLoseMoneyLowerCI: number;
  pLoseMoneyUpperCI: number;
};

export default function SimStats({
  minimum,
  valueAtRisk,
  q1,
  mean,
  meanLowerCI,
  meanUpperCI,
  median,
  q3,
  maximum,
  pLoseMoney,
  pLoseMoneyLowerCI,
  pLoseMoneyUpperCI,
}: Props) {
  const stats = [
    {
      name: "Minimum",
      value: minimum,
    },
    {
      name: "Value at Risk (5%)",
      value: valueAtRisk,
    },
    {
      name: "25th Percentile",
      value: q1,
    },
    {
      name: "Expected Profit",
      value: mean,
    },
    {
      name: "E(Profit) Lower 95% CI",
      value: meanLowerCI,
    },
    {
      name: "E(Profit) Upper 95% CI",
      value: meanUpperCI,
    },
    {
      name: "50th Percentile",
      value: median,
    },
    {
      name: "75th Percentile",
      value: q3,
    },
    {
      name: "Maximum",
      value: maximum,
    },
    {
      name: "P(Profit < 0)",
      value: pLoseMoney,
    },
    {
      name: "P(Profit < 0) Lower 95% CI",
      value: pLoseMoneyLowerCI,
    },
    {
      name: "P(Profit < 0) Upper 95% CI",
      value: pLoseMoneyUpperCI,
    },
  ];
  return (
    <section className="flex flex-col rounded-md border border-border p-4">
      {stats.map((stat) => (
        <ul key={stat.name} className="flex flex-row justify-between gap-4">
          <li className="text-md">{stat.name}:</li>
          <li className="text-md">
            {stat.name.includes("P(Profit")
              ? stat.value.toLocaleString("en-US", {
                  style: "percent",
                })
              : stat.value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
          </li>
        </ul>
      ))}
    </section>
  );
}
