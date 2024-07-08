type ResponseType = {
  distValues: number[];
};

export async function getTruncNormValues(
  distMin: string,
  distMean: string,
  distMax: string,
  distSD: string,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-t28w.onrender.com/api/distributions/truncated_normal?distMin=${distMin}&distMean=${distMean}&distMax=${distMax}&distSD=${distSD}`
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
