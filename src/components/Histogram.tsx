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
        layout={{}}
        config={{ responsive: true }}
      />
    </>
  );
}
