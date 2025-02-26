import type { ProductionResults } from "@/types/ProductionResults";

export async function simulateProduction(
  unitCost: number,
  unitPrice: number,
  salvagePrice: number,
  demandMin: number,
  demandMean: number,
  demandMax: number,
  demandSD: number,
  fixedCost: number,
  productionQuantity: number,
): Promise<ProductionResults> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? "https://simulation-api-rsaw.onrender.com/api/simulations/production"
      : "http://localhost:8000/api/simulations/production";
  const res = await fetch(DATA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      unitCost,
      unitPrice,
      salvagePrice,
      demandMin,
      demandMean,
      demandMax,
      demandSD,
      fixedCost,
      productionQuantity,
    }),
  });
  if (!res.ok) throw new Error("Something went wrong. Please try again.");
  const data = await res.json();
  return data;
}

export default simulateProduction;
