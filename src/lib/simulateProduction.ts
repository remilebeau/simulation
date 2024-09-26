import { redirect } from "next/navigation";

type ResponseType = {
  minimum: number;
  q1: number;
  median: number;
  q3: number;
  maximum: number;
  simulatedProfits: number[];
  meanProfit: number;
  pLoseMoney: number;
  valueAtRisk: number;
};

export async function simulateProduction(
  unitCost: string,
  unitPrice: string,
  salvagePrice: string,
  demandMin: string,
  demandMode: string,
  demandMax: string,
  demandSD: string,
  fixedCost: string,
  productionQuantity: string,
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
