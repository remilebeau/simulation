import Plot from "react-plotly.js";

type Props = {
  simValues: number[];
};

export default async function Histogram({ simValues }: Props) {
  return (
    <>
      <Plot
        data={[
          {
            x: simValues,
            type: "histogram",
          },
        ]}
        layout={{}}
        config={{
          responsive: true,
        }}
      />
    </>
  );
}
