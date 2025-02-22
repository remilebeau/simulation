import type { ProductionResults } from "@/types/ProductionResults";

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
): Promise<ProductionResults | null> {
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
      demandMode,
      demandMax,
      demandSD,
      fixedCost,
      productionQuantity,
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

export default simulateProduction;
