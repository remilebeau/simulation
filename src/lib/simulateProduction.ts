type ResponseType = {
  simValues: number[];
  meanProfit: number;
  lowerCI: number;
  upperCI: number;
  minProfit: number;
  maxProfit: number;
  q1: number;
  q2: number;
  q3: number;
  pLoseMoneyLowerCI: number;
  pLoseMoneyUpperCI: number;
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
      ? `https://simulation-api-t28w.onrender.com/api/simulations/production?unitCost=${unitCost}&unitPrice=${unitPrice}&salvagePrice=${salvagePrice}&demandMin=${demandMin}&demandMode=${demandMode}&demandMax=${demandMax}&fixedCost=${fixedCost}&productionQuantity=${productionQuantity}`
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
