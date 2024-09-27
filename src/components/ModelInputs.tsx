type Props = {
  unitCost: string;
  unitPrice: string;
  salvagePrice: string;
  demandMin: string;
  demandMean: string;
  demandMax: string;
  demandSD: string;
  fixedCost: string;
  productionQuantity: string;
};

export default function ModelInputs({
  unitCost,
  unitPrice,
  salvagePrice,
  demandMin,
  demandMean,
  demandMax,
  demandSD,
  fixedCost,
  productionQuantity,
}: Props) {
  return (
    <ul className="flex flex-col gap-4 rounded-md border border-white p-4 sm:grid sm:grid-cols-2">
      <li>
        <b>Unit Cost:</b> {Number(unitCost).toLocaleString("en-US")}
      </li>
      <li>
        <b>Unit Price:</b> {Number(unitPrice).toLocaleString("en-US")}
      </li>
      <li>
        <b>Salvage Price:</b> {Number(salvagePrice).toLocaleString("en-US")}
      </li>
      <li>
        <b>Fixed Cost:</b> {Number(fixedCost).toLocaleString("en-US")}
      </li>
      <li>
        <b>Production Quantity:</b>{" "}
        {Number(productionQuantity).toLocaleString("en-US")}
      </li>
      <li>
        <b>Min Demand:</b> {Number(demandMin).toLocaleString("en-US")}
      </li>
      <li>
        <b>Mean Demand:</b> {Number(demandMean).toLocaleString("en-US")}
      </li>
      <li>
        <b>Max Demand:</b> {Number(demandMax).toLocaleString("en-US")}
      </li>
      <li>
        <b>Demand Standard Deviation:</b>{" "}
        {Number(demandSD).toLocaleString("en-US")}
      </li>
    </ul>
  );
}
