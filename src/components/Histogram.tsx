import Plot from "react-plotly.js";

type Props = {
  simulatedProfits: number[];
};

export default async function Histogram({ simulatedProfits }: Props) {
  return (
    <>
      <Plot
        data={[
          {
            x: simulatedProfits,
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
