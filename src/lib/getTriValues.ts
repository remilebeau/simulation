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
      ? `https://simulation-api-t28w.onrender.com/api/distributions/triangular?distMin=${distMin}&distMode=${distMode}&distMax=${distMax}`
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
