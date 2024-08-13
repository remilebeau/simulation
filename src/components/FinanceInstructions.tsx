export default function FinanceInstructions() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-center text-2xl">
        Finance Model Parameters Explained
      </h2>
      <p>
        <b>Fixed Costs:</b> The total fixed costs over the 5 year planning
        horizon
      </p>
      <p>
        <b>Year One Margin:</b> The gross profit in year one.
      </p>
      <p>
        <b>Year One Sales Min:</b> The minimum sales in year one
      </p>
      <p>
        <b>Year One Sales Mode:</b> The expected sales in year one
      </p>
      <p>
        <b>Year One Sales Max:</b> The maximum sales in year one
      </p>
      <p>
        <b>Annual Margin Decrease:</b> The percentage by which gross profit will
        decrease each year. e.g. 0.04 means 4% decrease per year. Can be 0.
      </p>
      <p>
        <b>Annual Sales Decay Min:</b> The minimum percentage by which sales
        will decrease each year. e.g. 0.05 means 5% decrease per year. Can be 0.
      </p>
      <p>
        <b>Annual Sales Decay Mode:</b> The expected percentage by which sales
        will decrease each year. e.g. 0.08 means 8% decrease per year. Can be 0.
      </p>
      <p>
        <b>Annual Sales Decay Max:</b> The maximum percentage by which sales
        will decrease each year. e.g. 0.10 means 10% decrease per year. Can be
        0.
      </p>
      <p>
        <b>Tax Rate:</b> Marginal tax rate. Can be 0.
      </p>
      <p>
        <b>Discount Rate:</b> Discount rate for future cash flows. Can be 0.
      </p>
    </section>
  );
}
