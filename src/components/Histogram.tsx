import Plot from "react-plotly.js";

type Props = {
  values: number[];
};

export default async function Histogram({ values }: Props) {
  return (
    <>
      <Plot
        data={[
          {
            x: values,
            type: "histogram",
          },
        ]}
        layout={{}}
      />
    </>
  );
}
