"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle as ThemeSwitch } from "@/components/ThemeSwitch";
import getDistValues from "@/lib/getDistValues";
import getSimValues from "@/lib/getSimValues";

export default function HomePage() {
  const DistPlot = dynamic(() => import("@/components/DistPlot"), {
    ssr: false,
  });
  const SimPlot = dynamic(() => import("@/components/SimPlot"), {
    ssr: false,
  });
  const SimStats = dynamic(() => import("@/components/SimStats"), {
    ssr: false,
  });
  const [distMin, setDistMin] = useState<number>();
  const [distMode, setDistMode] = useState<number>();
  const [distMax, setDistMax] = useState<number>();
  const [distValues, setDistValues] = useState<number[]>([]);
  const [simDaysPerMonth, setSimDaysPerMonth] = useState<number>();
  const [simValues, setSimValues] = useState<number[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrMsg("");
    if (!distMin || !distMode || !distMax || !simDaysPerMonth) {
      setErrMsg("All fields are required");
      setIsLoading(false);
      return;
    }
    if (distMode < distMin || distMode > distMax) {
      setErrMsg("Expected value must be between minimum and maximum");
      setIsLoading(false);
      return;
    }
    const distResponse = await getDistValues(distMin, distMode, distMax);
    setDistValues(distResponse);
    const simResponse = await getSimValues(
      distMin,
      distMode,
      distMax,
      simDaysPerMonth
    );
    setSimValues(simResponse.simValues);
    setIsLoading(false);
  };

  return (
    <>
      <main className="flex flex-col max-w-md mx-auto justify-center items-center gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-8">
          <Label htmlFor="distMin" className="text-xl">
            Minimum Value:
          </Label>
          <Input
            className="text-xl"
            required
            type="number"
            value={distMin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDistMin(parseInt(e.target.value) || 0)
            }
          />
          <Label htmlFor="distMode" className="text-xl">
            Expected Value:
          </Label>
          <Input
            className="text-xl"
            required
            type="number"
            value={distMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDistMode(parseInt(e.target.value) || 0)
            }
          />
          <Label htmlFor="distMax" className="text-xl">
            Maximum Value:
          </Label>
          <Input
            className="text-xl"
            required
            type="number"
            value={distMax}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDistMax(parseInt(e.target.value) || 0)
            }
          />
          <Label htmlFor="simDaysPerMonth" className="text-xl">
            Days Per Month:
          </Label>
          <Input
            className="text-xl"
            required
            type="number"
            value={simDaysPerMonth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSimDaysPerMonth(parseInt(e.target.value) || 0)
            }
          />
          <Button type="submit" className="text-xl">
            Submit
          </Button>
        </form>
        {errMsg && <p className="text-red-500">{errMsg}</p>}
        {isLoading && (
          <>
            <p>Loading...</p>
            <p>The first request may take up to 60 seconds.</p>
          </>
        )}
        {distValues && distMax && distMode && distMin && (
          <DistPlot
            distValues={distValues}
            distMax={distMax}
            distMode={distMode}
            distMin={distMin}
          />
        )}
        {simValues && simDaysPerMonth && distMin && distMode && distMax && (
          <>
            <SimPlot
              distMin={distMin}
              distMode={distMode}
              distMax={distMax}
              simDaysPerMonth={simDaysPerMonth}
              simValues={simValues}
            />
            <SimStats simValues={simValues} />
          </>
        )}
      </main>
      <footer>
        <ThemeSwitch />
      </footer>
    </>
  );
}