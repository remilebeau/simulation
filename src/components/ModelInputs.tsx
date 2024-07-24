import React from "react";

type Props = {
  inputs: { name: string; value: string }[];
};

export default function ModelInputs({ inputs }: Props) {
  const formattedInputs = inputs.map((input) => (
    <p key={input.name}>
      {input.name}: {Number(input.value).toLocaleString("en-US")}
    </p>
  ));
  return (
    <section className="grid grid-cols-2 gap-4 p-4 text-left text-2xl font-bold">
      {formattedInputs}
    </section>
  );
}
