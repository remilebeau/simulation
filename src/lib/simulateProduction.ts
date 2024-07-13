type ResponseType = {
  simulatedProfits: number[];
  meanProfit: number;
  meanStandardError: number;
  meanLowerCI: number;
  meanUpperCI: number;
  pLoseMoneyLowerCI: number;
  pLoseMoneyUpperCI: number;
  valueAtRisk: number;
};

export async function simulateProduction(
  unitCost: number,
  unitPrice: number,
  salvagePrice: number,
  demandMin: number,
  demandMode: number,
  demandMax: number,
  fixedCost: number,
  productionQuantity: number,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://remilebeau-simulation-api.vercel.app/api/simulations/production?unitCost=${unitCost}&unitPrice=${unitPrice}&salvagePrice=${salvagePrice}&demandMin=${demandMin}&demandMode=${demandMode}&demandMax=${demandMax}&fixedCost=${fixedCost}&productionQuantity=${productionQuantity}`
      : `http://localhost:8000/api/simulations/production?unitCost=${unitCost}&unitPrice=${unitPrice}&salvagePrice=${salvagePrice}&demandMin=${demandMin}&demandMode=${demandMode}&demandMax=${demandMax}&fixedCost=${fixedCost}&productionQuantity=${productionQuantity}`;
  const res = await fetch(DATA_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export default simulateProduction;
