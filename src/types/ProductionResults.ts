export type ProductionResults = {
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
