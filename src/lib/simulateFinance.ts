export async function simulateFinance(
  fixedCost: number,
  demandMin: number,
  demandMode: number,
  demandMax: number,
  yearOneMargin: number,
  annualMarginDecrease: number,
  taxRate: number,
  discountRate: number,
  demandDecayMin: number,
  demandDecayMode: number,
  demandDecayMax: number,
) {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-t28w.onrender.com/api/finance?fixedCost=${fixedCost}&demandMin=${demandMin}&demandMode=${demandMode}&demandMax=${demandMax}&yearOneMargin=${yearOneMargin}&annualMarginDecrease=${annualMarginDecrease}&taxRate=${taxRate}&discountRate=${discountRate}&demandDecayMin=${demandDecayMin}&demandDecayMode=${demandDecayMode}&demandDecayMax=${demandDecayMax}`
      : `http://localhost:8000/api/simulations/finance?fixedCost=${fixedCost}&demandMin=${demandMin}&demandMode=${demandMode}&demandMax=${demandMax}&yearOneMargin=${yearOneMargin}&annualMarginDecrease=${annualMarginDecrease}&taxRate=${taxRate}&discountRate=${discountRate}&demandDecayMin=${demandDecayMin}&demandDecayMode=${demandDecayMode}&demandDecayMax=${demandDecayMax}`;
  const res = await fetch(DATA_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export default simulateFinance;
