type ResponseType = {
  distValues: number[];
};

export async function getTruncNormValues(
  distMin: number,
  distMean: number,
  distMax: number,
  distSD: number,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://remilebeau-simulation-api.vercel.app/api/distributions/truncated_normal?distMin=${distMin}&distMean=${distMean}&distMax=${distMax}&distSD=${distSD}`
      : `http://localhost:8000/api/distributions/truncated_normal?distMin=${distMin}&distMean=${distMean}&distMax=${distMax}&distSD=${distSD}`;
  const res = await fetch(DATA_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export default getTruncNormValues;
