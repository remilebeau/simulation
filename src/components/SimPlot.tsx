import Plot from "react-plotly.js";

type Props = {
  simValues: number[];
  min: string;
  mode: string;
  max: string;
  sd?: string;
  unitCost?: string;
  unitPrice?: string;
  salvagePrice?: string;
  fixedCost?: string;
  productionQuantity?: string;
};

export default async function SimPlot({
  simValues,
  unitCost,
  unitPrice,
  salvagePrice,
  min,
  mode,
  max,
  sd,
  fixedCost,
  productionQuantity,
}: Props) {
  let title = "";
  if (unitCost && unitPrice && salvagePrice && fixedCost && productionQuantity)
    title =
      unitCost &&
      unitPrice &&
      salvagePrice &&
      fixedCost &&
      productionQuantity &&
      `Unit Cost = ${unitCost} Unit Price = ${unitPrice} Salvage Price = ${salvagePrice}<br>Demand = [${min}, ${mode}, ${max}]<br>Fixed Cost = ${fixedCost}<br>Production Quantity = ${productionQuantity}`;
  else title = `Demand = [${min}, ${mode}, ${max}]`;
  return (
    <>
      <Plot
        data={[
          {
            x: simValues,
            type: "histogram",
          },
        ]}
        layout={{
          autosize: true,
          plot_bgcolor: "white",
          paper_bgcolor: "white",
          font: { color: "black" },
          title: title,
        }}
      />
    </>
  );
}
