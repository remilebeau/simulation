type Props = {
  minimum: number;
  tenPercentile: number;
  q1: number;
  median: number;
  q3: number;
  ninetyPercentile: number;
  maximum: number;
  mean: number;
  pLoseMoney: number;
};

export default function SimStats({
  minimum,
  tenPercentile,
  q1,
  median,
  q3,
  ninetyPercentile,
  maximum,
  mean,
  pLoseMoney,
}: Props) {
  const stats = [
    {
      name: "Minimum",
      value: minimum,
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
      name: "Maximum",
      value: maximum,
    },
    {
      name: "Average",
      value: mean,
    },
    {
      name: "Chance of Losing Money",
      value: pLoseMoney,
    },
  ];
  return (
    <article className="flex w-full flex-col rounded-md border border-border p-4">
      <h2 className="text-center font-bold">Summary of Simulated Profits</h2>
      {stats.map((stat) => (
        <section key={stat.name} className="flex flex-row justify-between">
          <p className="text-md">{stat.name}:</p>
          <p className="text-md">
            {stat.name == "Chance of Losing Money"
              ? stat.value.toLocaleString("en-US", {
                  style: "percent",
                })
              : stat.value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
          </p>
        </section>
      ))}
    </article>
  );
}
