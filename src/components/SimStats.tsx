type Props = {
  minimum: number;
  q1: number;
  median: number;
  q3: number;
  maximum: number;
  meanProfit: number;
  pLoseMoney: number;
  valueAtRisk: number;
};

export default function SimStats({
  minimum,
  q1,
  median,
  q3,
  maximum,
  meanProfit,
  pLoseMoney,
  valueAtRisk,
}: Props) {
  const stats = [
    {
      name: "Minimum",
      value: minimum,
    },
    {
      name: "Q1",
      value: q1,
    },
    {
      name: "Median",
      value: median,
    },
    {
      name: "Q3",
      value: q3,
    },
    {
      name: "Maximum",
      value: maximum,
    },
    {
      name: "Mean",
      value: meanProfit,
    },
    {
      name: "P(Lose Money)",
      value: pLoseMoney,
    },
    {
      name: "VaR",
      value: valueAtRisk,
    },
  ];
  return (
    <article className="flex w-full flex-col rounded-md border border-border p-4">
      <h2 className="text-center font-bold">Simulation Statistics</h2>
      {stats.map((stat) => (
        <section key={stat.name} className="flex flex-row justify-between">
          <p className="text-md">{stat.name}:</p>
          <p className="text-md">
            {stat.name !== "P(Lose Money)"
              ? stat.value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })
              : stat.value.toLocaleString("en-US", {
                  style: "percent",
                })}
          </p>
        </section>
      ))}
    </article>
  );
}
