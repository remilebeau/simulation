export default function MarketingInstructions() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="font-bold">Marketing Model Parameters</h2>
      <p>
        <b>Retention Rate:</b> The percentage of customers who will remain
        customers next year.
      </p>
      <p>
        <b>Discount Rate:</b> The discount rate of future cash flows.
      </p>
      <p>
        <b>Standard Deviation:</b> The standard deviation of all mean profits,
        as a percentage (e.g. 0.1 for 10% standard deviation).
      </p>
      <p>
        <b>Year One Mean Profit:</b> Mean profit in year one.
      </p>
      <p>
        <b>Year Two Mean Profit:</b> Mean profit in year two.
      </p>
      <p>
        <b>Year Three Mean Profit:</b> Mean profit in year three.
      </p>
      <p>
        <b>Year Four Mean Profit:</b> Mean profit in year four.
      </p>
      <p>
        <b>Year Five Mean Profit:</b> Mean profit in year five.
      </p>
    </section>
  );
}
