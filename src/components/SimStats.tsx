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
  function formatValue(value: number) {
    // format percentages
    if (value >= 0 && value <= 1) {
      return value.toLocaleString("en-US", {
        style: "percent",
        maximumFractionDigits: 0,
      });
    }
    // format currencies
    else
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
  }
  const stats = [
    {
      name: "Expected Profit",
      value: formatValue(mean),
    },
    {
      name: "E(Profit) Lower 95% CI",
      value: formatValue(meanLowerCI),
    },
    {
      name: "E(Profit) Upper 95% CI",
      value: formatValue(meanUpperCI),
    },
    {
      name: "Minimum",
      value: formatValue(minimum),
    },
    {
      name: "25th Percentile",
      value: formatValue(q1),
    },
    {
      name: "50th Percentile",
      value: formatValue(median),
    },
    {
      name: "75th Percentile",
      value: formatValue(q3),
    },
    {
      name: "Maximum",
      value: formatValue(maximum),
    },
    {
      name: "P(Profit < 0)",
      value: formatValue(pLoseMoney),
    },
    {
      name: "P(Profit < 0) Lower 95% CI",
      value: formatValue(pLoseMoneyLowerCI),
    },
    {
      name: "P(Profit < 0) Upper 95% CI",
      value: formatValue(pLoseMoneyUpperCI),
    },
    {
      name: "Value at Risk (5%)",
      value: formatValue(valueAtRisk),
    },
  ];
  return (
    <section className="flex flex-col rounded-md border border-border p-4">
      {stats.map((stat) => (
        <ul key={stat.name} className="flex flex-row justify-between gap-4">
          <li className="text-md">{stat.name}:</li>
          <li className="text-md">{stat.value}</li>
        </ul>
      ))}
    </section>
  );
}
