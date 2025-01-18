import Plot from "react-plotly.js";

type Props = {
  values: number[];
};

export default function Histogram({ values }: Props) {
  return (
    <section className="border border-border rounded-xl p-4">
      <Plot
        className="max-w-xs sm:max-w-3xl"
        data={[
          {
            x: values,
            type: "histogram",
            marker: {
              color: "#ffffff",
            },
          },
        ]}
        layout={{
          title: {
            text: "Simulated Profits (1000 trials)",
            font: {
              color: "#ffffff",
            },
          },
          xaxis: {
            title: "Profit ($)",
            color: "#ffffff",
          },
          yaxis: {
            title: "Frequency",
            color: "#ffffff",
          },
          paper_bgcolor: "#000000",
          plot_bgcolor: "#000000",
        }}
        config={{
          responsive: true,
          staticPlot: true,
        }}
      />
    </section>
  );
}
