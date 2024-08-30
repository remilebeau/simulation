export default function RandomValuesInstructions() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="font-bold">Generate Pseudorandom Values</h2>
      <p>
        Generate pseudorandom values from a normal, triangular, truncated
        normal, or uniform distribution.
      </p>
      <p>
        The values are pseudorandom, meaning the same inputs will produce the
        same outputs. This isolates the effects of changing other parameters in
        the model.
      </p>
    </section>
  );
}
