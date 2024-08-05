import { redirect } from "next/navigation";

type ResponseType = {
  distValues: number[];
  distribution: string;
};

export async function simulateRandomValues(
  min?: string,
  mean?: string,
  max?: string,
  sd?: string,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-rsaw.onrender.com/api/simulations/random_values?min=${min}&mean=${mean}&max=${max}&sd=${sd}`
      : `http://localhost:8000/api/simulations/random_values?min=${min}&mean=${mean}&max=${max}&sd=${sd}`;
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

export default simulateRandomValues;
