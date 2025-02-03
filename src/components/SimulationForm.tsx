import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isValidInput } from "@/lib/validation";
import simulateProduction from "@/lib/simulateProduction";
import { useState } from "react";
import Histogram from "@/components/Histogram";
import SimStats from "@/components/SimStats";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import SimulationInstructions from "@/components/SimulationInstructions";
import FieldWithLabel from "@/components/FieldWithLabel";
// define form schema

const formSchema = z
  .object({
    unitCost: z.coerce.number(),
    unitPrice: z.coerce.number(),
    salvagePrice: z.coerce.number(),
    demandMin: z.coerce.number(),
    demandMean: z.coerce.number(),
    demandMax: z.coerce.number(),
    demandSD: z.coerce.number().gte(0, {
      message: "Standard deviation must be greater than or equal to 0",
    }),
    fixedCost: z.coerce.number(),
    productionQuantity: z.coerce.number().gt(0, {
      message: "Production quantity must be greater than 0",
    }),
  })

  .refine(
    (fields) =>
      // validate input
      isValidInput(
        fields.demandMin,
        fields.demandMean,
        fields.demandMax,
        fields.demandSD
      ),
    {
      message:
        "Please check that (min <= mean <= max) and (min < max) and (sd >= 0)",
      path: ["unitCost"],
    }
  );

export default function SimulationForm() {
  // define state for simulation results
  const [minimum, setMinimum] = useState(0);
  const [valueAtRisk, setValueAtRisk] = useState(0);
  const [q1, setQ1] = useState(0);
  const [mean, setMean] = useState(0);
  const [meanLowerCI, setMeanLowerCI] = useState(0);
  const [meanUpperCI, setMeanUpperCI] = useState(0);
  const [median, setMedian] = useState(0);
  const [q3, setQ3] = useState(0);
  const [maximum, setMaximum] = useState(0);
  const [pLoseMoney, setPLoseMoney] = useState(0);
  const [pLoseMoneyLowerCI, setPLoseMoneyLowerCI] = useState(0);
  const [pLoseMoneyUpperCI, setPLoseMoneyUpperCI] = useState(0);
  const [simulatedProfits, setSimulatedProfits] = useState<number[]>([]);

  // define loading state
  const [isLoading, setIsLoading] = useState(false);

  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // define submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const {
      unitCost,
      unitPrice,
      salvagePrice,
      demandMin,
      demandMean,
      demandMax,
      demandSD,
      fixedCost,
      productionQuantity,
    } = values;
    const {
      minimum,
      valueAtRisk,
      q1,
      mean,
      meanLowerCI,
      meanUpperCI,
      median,
      q3,
      maximum,
      pLoseMoney,
      pLoseMoneyLowerCI,
      pLoseMoneyUpperCI,
      simulatedProfits,
    } = await simulateProduction(
      unitCost,
      unitPrice,
      salvagePrice,
      demandMin,
      demandMean,
      demandMax,
      demandSD,
      fixedCost,
      productionQuantity
    );
    setMinimum(minimum);
    setValueAtRisk(valueAtRisk);
    setQ1(q1);
    setMean(mean);
    setMeanLowerCI(meanLowerCI);
    setMeanUpperCI(meanUpperCI);
    setMedian(median);
    setQ3(q3);
    setMaximum(maximum);
    setPLoseMoney(pLoseMoney);
    setPLoseMoneyLowerCI(pLoseMoneyLowerCI);
    setPLoseMoneyUpperCI(pLoseMoneyUpperCI);
    setSimulatedProfits(simulatedProfits);
    setIsLoading(false);
  }

  return (
    <>
      {!isLoading && !simulatedProfits.length && <SimulationInstructions />}
      {isLoading && <Loader />}
      {simulatedProfits.length > 0 && !isLoading && (
        <>
          <Histogram values={simulatedProfits} />
          <SimStats
            minimum={minimum}
            valueAtRisk={valueAtRisk}
            q1={q1}
            mean={mean}
            meanLowerCI={meanLowerCI}
            meanUpperCI={meanUpperCI}
            median={median}
            q3={q3}
            maximum={maximum}
            pLoseMoney={pLoseMoney}
            pLoseMoneyLowerCI={pLoseMoneyLowerCI}
            pLoseMoneyUpperCI={pLoseMoneyUpperCI}
          />
        </>
      )}
      {!isLoading && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-xl border p-4"
          >
            <FieldWithLabel label="Unit Cost" name="unitCost" />
            <FieldWithLabel label="Unit price" name="unitPrice" />
            <FieldWithLabel label="Salvage Price" name="salvagePrice" />
            <FieldWithLabel label="Fixed Costs" name="fixedCost" />
            <FieldWithLabel label="Minimum Demand" name="demandMin" />
            <FieldWithLabel label="Expected Demand" name="demandMean" />
            <FieldWithLabel label="Maximum Demand" name="demandMax" />
            <FieldWithLabel label="Demand Standard Deviation" name="demandSD" />
            <FieldWithLabel
              label="Production Quantity"
              name="productionQuantity"
            />

            <Button className="rounded-xl" type="submit">
              Simulate
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
