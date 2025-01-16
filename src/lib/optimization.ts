type OptimizationResults = {
  objFuncVal: number;
  xMondayFriday: number;
  xTuesdaySaturday: number;
  xWednesdaySunday: number;
  xThursdayMonday: number;
  xFridayTuesday: number;
  xSaturdayWednesday: number;
  xSundayThursday: number;
  mondayStaff: number;
  tuesdayStaff: number;
  wednesdayStaff: number;
  thursdayStaff: number;
  fridayStaff: number;
  saturdayStaff: number;
  sundayStaff: number;
};

export async function optimization(
  monday: number,
  tuesday: number,
  wednesday: number,
  thursday: number,
  friday: number,
  saturday: number,
  sunday: number
): Promise<OptimizationResults> {
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
  return res.json();
}

export default optimization;
