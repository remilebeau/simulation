import { redirect } from "next/navigation";

type ResponseType = {
  meanNPV: number;
  meanYearsLoyal: number;
};

export async function simulateMarketing(
  retentionRate: number,
  discountRate: number,
  stDev: number,
  yearOneMeanProfit: number,
  yearTwoMeanProfit: number,
  yearThreeMeanProfit: number,
  yearFourMeanProfit: number,
  yearFiveMeanProfit: number,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-rsaw.onrender.com/api/simulations/marketing?retentionRate=${retentionRate}&discountRate=${discountRate}&stDev=${stDev}&yearOneMeanProfit=${yearOneMeanProfit}&yearTwoMeanProfit=${yearTwoMeanProfit}&yearThreeMeanProfit=${yearThreeMeanProfit}&yearFourMeanProfit=${yearFourMeanProfit}&yearFiveMeanProfit=${yearFiveMeanProfit}`
      : `http://localhost:8000/api/simulations/marketing?retentionRate=${retentionRate}&discountRate=${discountRate}&stDev=${stDev}&yearOneMeanProfit=${yearOneMeanProfit}&yearTwoMeanProfit=${yearTwoMeanProfit}&yearThreeMeanProfit=${yearThreeMeanProfit}&yearFourMeanProfit=${yearFourMeanProfit}&yearFiveMeanProfit=${yearFiveMeanProfit}`;
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

export default simulateMarketing;
