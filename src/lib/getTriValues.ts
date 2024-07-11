type ResponseType = {
  distValues: number[];
};

export async function getTriValues(
  distMin: number,
  distMode: number,
  distMax: number,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://remilbeau-simulation-api.vercel.app/api/distributions/triangular?distMin=${distMin}&distMode=${distMode}&distMax=${distMax}`
      : `http://localhost:8000/api/distributions/triangular?distMin=${distMin}&distMode=${distMode}&distMax=${distMax}`;
  const res = await fetch(DATA_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export default getTriValues;
