type Props = {
  minimum: number;
  valueAtRisk: number;
  q1: number;
  mean: number;
  median: number;
  q3: number;
  maximum: number;
  pLoseMoney: number;
};

export default function SimStats({
  minimum,
  valueAtRisk,
  q1,
  mean,
  median,
  q3,
  maximum,
  pLoseMoney,
}: Props) {
  const stats = [
    {
      name: "Expected Profit",
      value: mean,
    },
    {
      name: "Minimum",
      value: minimum,
    },
    {
      name: "25th Percentile",
      value: q1,
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
      name: "Value at Risk (5%)",
      value: valueAtRisk,
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
