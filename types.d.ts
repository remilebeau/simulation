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

type ProductionResults = {
  minimum: number;
  valueAtRisk: number;
  q1: number;
  mean: number;
  meanLowerCI: number;
  meanUpperCI: number;
  median: number;
  q3: number;
  maximum: number;
  pLoseMoney: number;
  pLoseMoneyLowerCI: number;
  pLoseMoneyUpperCI: number;
  simulatedProfits: number[];
};
