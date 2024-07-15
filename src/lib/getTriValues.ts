import { redirect } from "next/navigation";

type ResponseType = {
  distValues: number[];
};

export async function getTriValues(
  distMin: string,
  distMode: string,
  distMax: string,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://remilebeau-simulation-api.vercel.app/api/distributions/triangular?distMin=${distMin}&distMode=${distMode}&distMax=${distMax}`
      : `http://localhost:8000/api/distributions/triangular?distMin=${distMin}&distMode=${distMode}&distMax=${distMax}`;
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

export default getTriValues;
