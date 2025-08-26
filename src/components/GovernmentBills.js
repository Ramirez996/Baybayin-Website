export default function GovernmentBills() {
  const bill = {
    billID: "S. No. 1866",
    title: "An Act Declaring Baybayin as the National Script of the Philippines",
    description: "Senator Loren B. Legarda has introduced the bill promoting Baybayin as part of cultural development. It seeks the promotion, protection, preservation, and conservation of the 'Baybayin' script."
  };

  // viewBill() method
  const viewBill = () => {
    window.open("https://legacy.senate.gov.ph/lisdata/4073037114!.pdf", "_blank");
  };

  return (
    <div className="card">
      <h3>{bill.title}</h3>
      <p><strong>Bill ID:</strong> {bill.billID}</p>
      <p>
        <a href="https://legacy.senate.gov.ph/lisdata/4073037114!.pdf" target="_blank" rel="noreferrer">
          Read Senate Bill PDF
        </a>
      </p>
      <p>{bill.description}</p>
    </div>
  );
}