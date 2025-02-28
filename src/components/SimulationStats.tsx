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
  const mean = formatValue(simData.mean);
  const meanLowerCI = formatValue(simData.meanLowerCI);
  const meanUpperCI = formatValue(simData.meanUpperCI);
  const pLoseMoney = formatValue(simData.pLoseMoney);
  const pLoseMoneyLowerCI = formatValue(simData.pLoseMoneyLowerCI);
  const pLoseMoneyUpperCI = formatValue(simData.pLoseMoneyUpperCI);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>Average Profit: </td>
            <td>{mean}</td>
          </tr>
          <tr>
            <td>E(Profit) 95% CI: </td>
            <td>
              {meanLowerCI} to {meanUpperCI}
            </td>
          </tr>
          <tr>
            <td>Probability of Negative Profit: </td>
            <td>{pLoseMoney}</td>
          </tr>
          <tr>
            <td>P(Profit &lt; 0) 95% CI:</td>
            <td>
              {pLoseMoneyLowerCI} to {pLoseMoneyUpperCI}
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
    </>
  );
}
