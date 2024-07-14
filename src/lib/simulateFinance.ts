type ResponseType = {
  simulatedNPVs: number[];
  meanNPV: number;
  meanStandardError: number;
  meanLowerCI: number;
  meanUpperCI: number;
  pLoseMoneyLowerCI: number;
  pLoseMoneyUpperCI: number;
  valueAtRisk: number;
};

export async function simulateFinance(
  fixedCost: number,
  yearOneMargin: number,
  yearOneSalesMin: number,
  yearOneSalesMode: number,
  yearOneSalesMax: number,
  annualMarginDecrease: number | null,
  annualSalesDecayMin: number | null,
  annualSalesDecayMode: number | null,
  annualSalesDecayMax: number | null,
  taxRate: number | null,
  discountRate: number | null,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://remilebeau-simulation-api.vercel.app/api/simulations/finance?fixedCost=${fixedCost}&yearOneMargin=${yearOneMargin}&yearOneSalesMin=${yearOneSalesMin}&yearOneSalesMode=${yearOneSalesMode}&yearOneSalesMax=${yearOneSalesMax}&annualMarginDecrease=${annualMarginDecrease}&annualSalesDecayMin=${annualSalesDecayMin}&annualSalesDecayMode=${annualSalesDecayMode}&annualSalesDecayMax=${annualSalesDecayMax}&taxRate=${taxRate}&discountRate=${discountRate}`
      : `http://localhost:8000/api/simulations/finance?fixedCost=${fixedCost}&yearOneMargin=${yearOneMargin}&yearOneSalesMin=${yearOneSalesMin}&yearOneSalesMode=${yearOneSalesMode}&yearOneSalesMax=${yearOneSalesMax}&annualMarginDecrease=${annualMarginDecrease}&annualSalesDecayMin=${annualSalesDecayMin}&annualSalesDecayMode=${annualSalesDecayMode}&annualSalesDecayMax=${annualSalesDecayMax}&taxRate=${taxRate}&discountRate=${discountRate}`;
  const res = await fetch(DATA_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export default simulateFinance;
