import { redirect } from "next/navigation";

type ResponseType = {
  meanNPV: number;
  meanYearsLoyal: number;
};

export async function simulateMarketing(
  retentionRate: number,
  discountRate: number,
  stDev: number,
  meanProfits: number[],
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-rsaw.onrender.com/api/simulations/marketing`
      : `http://localhost:8000/api/simulations/marketing`;
  const res = await fetch(DATA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      retentionRate,
      discountRate,
      stDev,
      meanProfits,
    }),
  });
  if (!res.ok) {
    redirect("/");
  }
  return res.json();
}

export default simulateMarketing;
