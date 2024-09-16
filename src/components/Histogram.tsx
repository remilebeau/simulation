import Plot from "react-plotly.js";

type Props = {
  values: number[];
};

export default async function Histogram({ values }: Props) {
  return (
    <>
      <Plot
        className="max-w-sm sm:max-w-3xl"
        data={[
          {
            x: values,
            type: "histogram",
          },
        ]}
        layout={{
          title: "Simulated Profits (click to edit title)",
          xaxis: {
            title: "Simulated Profit ($) (click to edit label)",
          },
          yaxis: {
            title: "Count (click to edit label)",
          },
        }}
        config={{ responsive: true, editable: true }}
      />
    </>
  );
}
