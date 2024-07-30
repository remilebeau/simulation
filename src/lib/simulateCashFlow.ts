import { redirect } from "next/navigation";

type ResponseType = {
  annualCashFlows: number[];
};

export async function simulateCashFlow(
  periodsPerYear: string,
  min: string,
  mean: string,
  max: string,
  sd: string,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-rsaw.onrender.com/api/simulations/cash_flow?periodsPerYear=${periodsPerYear}&min=${min}&mean=${mean}&max=${max}&sd=${sd}`
      : `http://localhost:8000/api/simulations/cash_flow?periodsPerYear=${periodsPerYear}&min=${min}&mean=${mean}&max=${max}&sd=${sd}`;
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

export default simulateCashFlow;
