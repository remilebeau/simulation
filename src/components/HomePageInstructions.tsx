export default function HomePageInstructions() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <p>Select a business scenario and input the parameters.</p>
      <p>
        The scenario will be simulated 1000 times, and the 1000 simulated
        profits will be summarized in a histogram.
      </p>
      <p>
        From this histogram, we can answer the following questions about our
        scenario:
      </p>
      <ul>
        <li>What is the expected profit?</li>
        <li>What is the likelihood of a profit above a certain value?</li>
        <li>What was the lowest profit observed?</li>
        <li>What was the highest profit observed?</li>
        <li>What is the risk of losing money?</li>
        <li>What is the value at risk?</li>
      </ul>
      <p>
        To download the raw output data for your own analysis, please visit the{" "}
        <a
          href="https://simulation-api-rsaw.onrender.com/docs"
          rel="noreferrer"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          API docs.
        </a>
      </p>
    </section>
  );
}
