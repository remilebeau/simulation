import { redirect } from "next/navigation";

type ResponseType = {
  xMonday: number;
  xTuesday: number;
  xWednesday: number;
  xThursday: number;
  xFriday: number;
  xSaturday: number;
  xSunday: number;
};

export async function optimization(
  monday: number,
  tuesday: number,
  wednesday: number,
  thursday: number,
  friday: number,
  saturday: number,
  sunday: number,
): Promise<ResponseType> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://simulation-api-rsaw.onrender.com/api/optimizations/staffing?monday=${monday}&tuesday=${tuesday}&wednesday=${wednesday}&thursday=${thursday}&friday=${friday}&saturday=${saturday}&sunday=${sunday}`
      : `http://localhost:8000/api/optimizations/staffing?monday=${monday}&tuesday=${tuesday}&wednesday=${wednesday}&thursday=${thursday}&friday=${friday}&saturday=${saturday}&sunday=${sunday}`;
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

export default optimization;
