import { redirect } from "next/navigation";

type ResponseType = {
  minimum: number;
  valueAtRisk: number;
  q1: number;
  mean: number;
  meanLowerCI: number;
  meanUpperCI: number;
  median: number;
  q3: number;
  maximum: number;
  pLoseMoney: number;
  pLoseMoneyLowerCI: number;
  pLoseMoneyUpperCI: number;
  simulatedProfits: number[];
};

export async function simulateProduction(
  unitCost: number,
  unitPrice: number,
  salvagePrice: number,
  demandMin: number,
  demandMode: number,
  demandMax: number,
  demandSD: number,
  fixedCost: number,
  productionQuantity: number,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-rsaw.onrender.com/api/simulations/production?unitCost=${unitCost}&unitPrice=${unitPrice}&salvagePrice=${salvagePrice}&demandMin=${demandMin}&demandMode=${demandMode}&demandMax=${demandMax}&demandSD=${demandSD}&fixedCost=${fixedCost}&productionQuantity=${productionQuantity}`
      : `http://localhost:8000/api/simulations/production?unitCost=${unitCost}&unitPrice=${unitPrice}&salvagePrice=${salvagePrice}&demandMin=${demandMin}&demandMode=${demandMode}&demandMax=${demandMax}&demandSD=${demandSD}&fixedCost=${fixedCost}&productionQuantity=${productionQuantity}`;
  const res = await fetch(DATA_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    redirect("/");
  }
  return res.json();
}

export default simulateProduction;
