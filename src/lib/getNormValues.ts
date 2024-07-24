import { redirect } from "next/navigation";

type ResponseType = {
  distValues: number[];
};

export async function getNormValues(
  distMean: string,
  distSD: string,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-rsaw.onrender.com/api/distributions/normal?distMean=${distMean}&distSD=${distSD}`
      : `http://localhost:8000/api/distributions/normal?distMean=${distMean}&distSD=${distSD}`;
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

export default getNormValues;
