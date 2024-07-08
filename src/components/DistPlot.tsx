import Plot from "react-plotly.js";

type Props = {
  simValues: number[];
  min: string;
  mode: string;
  max: string;
  sd?: string;
};

export default async function DistPlot({
  simValues,
  min,
  mode,
  max,
  sd,
}: Props) {
  const title = `Distribution = [${min}, ${mode}, ${max}]${
    sd ? ` SD = ${sd}` : ""
  }`;
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
