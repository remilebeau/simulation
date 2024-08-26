export default function RandomValuesInstructions() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="font-bold">Generate Pseudorandom Values</h2>
      <p>
        Generate pseudorandom values from a triangular, truncated normal,
        uniform, or normal distribution.
      </p>
      <p>
        The values are pseudorandom, meaning the same inputs will product the
        same outputs. This allows us to isolate the effects of changing other
        parameters in our model. Otherwise, every run of the model would be
        different. And we would not know if that difference was because of a
        change in the distribution, or a change in the other parameters of the
        model.
      </p>
    </section>
  );
}
