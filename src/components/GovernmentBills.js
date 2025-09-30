import '../css/GovernmentBills.css';

export default function GovernmentBills() {
  // CHANGED: 'bill' object is now 'bills' array of objects
  const bills = [
    {
      billID: "S. No. 1866",
      title: "An Act Declaring Baybayin as the National Script of the Philippines",
      description: "Senator Loren B. Legarda has introduced the bill promoting Baybayin as part of cultural development. It seeks the promotion, protection, preservation, and conservation of the 'Baybayin' script.",
      // NEW: pdfPath attribute added to the object structure
      pdfPath: "/docs/SB1866_baybayin_script.pdf"
    },
    {
      billID: "S. No. 2440",
      title: "An Act Declaring Baybayin as the National Writing System",
      description: "A similar bill filed in the House of Representatives aims to promote Baybayin. It mandates government agencies to use Baybayin in signage and literature to revitalize its use.",
      pdfPath: "/docs/SB2440_baybayin_writing.pdf"
    }
  ];

  // viewBill() method - Now defined to take the path as an argument
  // This preserves the method structure as requested.
  const viewBill = (path) => {
    // Uses the local file path instead of the external URL
    window.open(path, "_blank");
  };

  return (
    <div className="bills-list-container">
      {bills.map((bill, index) => (
        <div key={index} className="bill-card">
          <h3>{bill.title}</h3>
          <p><strong>Bill ID:</strong> {bill.billID}</p>
          <p>
            {/* The <a> tag is kept, but the logic is linked via onClick to the viewBill method */}
            {/* The href attribute is set to the pdfPath to allow right-click 'open in new tab' functionality */}
            <a 
              href={bill.pdfPath} 
              target="_blank" 
              rel="noopener noreferrer" 
              // Using onClick to call the viewBill method with the current bill's path
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                viewBill(bill.pdfPath);
              }}
              className="bill-link"
            >
              Read full Bill PDF
            </a>
          </p>
          <p>{bill.description}</p>
        </div>
      ))}
    </div>
  );
}