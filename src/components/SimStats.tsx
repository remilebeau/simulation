type Props = {
  minimum: number;
  fivePercentile: number;
  tenPercentile: number;
  q1: number;
  median: number;
  q3: number;
  ninetyPercentile: number;
  ninetyFivePercentile: number;
  maximum: number;
  mean: number;
  pLoseMoney: number;
};

export default function SimStats({
  minimum,
  fivePercentile,
  tenPercentile,
  q1,
  median,
  q3,
  ninetyPercentile,
  ninetyFivePercentile,
  maximum,
  mean,
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
      name: "5th Percentile",
      value: fivePercentile,
    },
    {
      name: "10th Percentile",
      value: tenPercentile,
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
      name: "90th Percentile",
      value: ninetyPercentile,
    },
    {
      name: "95th Percentile",
      value: ninetyFivePercentile,
    },
    {
      name: "Maximum",
      value: maximum,
    },
    {
      name: "P(Profit < 0)",
      value: pLoseMoney,
    },
  ];
  return (
    <section className="flex flex-col rounded-md border border-border p-4">
      {stats.map((stat) => (
        <ul key={stat.name} className="flex flex-row justify-between gap-4">
          <li className="text-md">{stat.name}:</li>
          <li className="text-md">
            {stat.name == "P(Profit < 0)"
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
