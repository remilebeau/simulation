import { redirect } from "next/navigation";

type ResponseType = {
  distValues: number[];
};

export async function getUniValues(
  distMin: string,
  distMax: string,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-rsaw.onrender.com/api/distributions/uniform?distMin=${distMin}&distMax=${distMax}`
      : `http://localhost:8000/api/distributions/uniform?distMin=${distMin}&distMax=${distMax}`;
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

export default getUniValues;
