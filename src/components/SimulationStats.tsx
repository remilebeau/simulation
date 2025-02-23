import type { ProductionResults } from "@/types/ProductionResults";
type Props = {
  simData: ProductionResults;
};

export default function SimulationStats({ simData }: Props) {
  function formatValue(value: number) {
    if (value >= 0 && value <= 1) {
      return value.toLocaleString("en-US", {
        style: "percent",
        maximumFractionDigits: 0,
      });
    } else
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
  }
  const stats = [
    {
      name: "Minimum",
      value: formatValue(simData.minimum),
    },
    {
      name: "25th Percentile",
      value: formatValue(simData.q1),
    },
    {
      name: "Expected Profit",
      value: formatValue(simData.mean),
    },
    {
      name: "50th Percentile",
      value: formatValue(simData.median),
    },
    {
      name: "75th Percentile",
      value: formatValue(simData.q3),
    },
    {
      name: "Maximum",
      value: formatValue(simData.maximum),
    },
    {
      name: "P(Profit < 0)",
      value: formatValue(simData.pLoseMoney),
    },
  ];
  return (
    <>
      <section className="flex flex-col sm:mx-auto sm:w-1/2">
        {stats.map((stat) => (
          <ul key={stat.name} className="flex flex-row justify-between">
            <li className="text-md">{stat.name}:</li>
            <li className="text-md">{stat.value}</li>
          </ul>
        ))}
      </section>
      <hr />
    </>
  );
}
