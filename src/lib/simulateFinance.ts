import { redirect } from "next/navigation";
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
  fixedCost: string,
  yearOneMargin: string,
  yearOneSalesMin: string,
  yearOneSalesMode: string,
  yearOneSalesMax: string,
  annualMarginDecrease: string,
  annualSalesDecayMin: string,
  annualSalesDecayMode: string,
  annualSalesDecayMax: string,
  taxRate: string,
  discountRate: string,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-rsaw.onrender.com/api/simulations/finance?fixedCost=${fixedCost}&yearOneMargin=${yearOneMargin}&yearOneSalesMin=${yearOneSalesMin}&yearOneSalesMode=${yearOneSalesMode}&yearOneSalesMax=${yearOneSalesMax}&annualMarginDecrease=${annualMarginDecrease}&annualSalesDecayMin=${annualSalesDecayMin}&annualSalesDecayMode=${annualSalesDecayMode}&annualSalesDecayMax=${annualSalesDecayMax}&taxRate=${taxRate}&discountRate=${discountRate}`
      : `http://localhost:8000/api/simulations/finance?fixedCost=${fixedCost}&yearOneMargin=${yearOneMargin}&yearOneSalesMin=${yearOneSalesMin}&yearOneSalesMode=${yearOneSalesMode}&yearOneSalesMax=${yearOneSalesMax}&annualMarginDecrease=${annualMarginDecrease}&annualSalesDecayMin=${annualSalesDecayMin}&annualSalesDecayMode=${annualSalesDecayMode}&annualSalesDecayMax=${annualSalesDecayMax}&taxRate=${taxRate}&discountRate=${discountRate}`;
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

export default simulateFinance;
