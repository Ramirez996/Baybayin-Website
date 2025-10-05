import '../css/GovernmentBills.css';
import { useState } from 'react';

export default function GovernmentBills() {
  const bills = [
    {
      billID: "S. No. 1866",
      title: "An Act Declaring Baybayin as the National Script of the Philippines",
      description:
        "Senator Loren B. Legarda has introduced the bill promoting Baybayin as part of cultural development. It seeks the promotion, protection, preservation, and conservation of the 'Baybayin' script.",
      pdfPath: "/docs/SB1866_baybayin_script.pdf",
    },
    {
      billID: "S. No. 2440",
      title: "An Act Declaring Baybayin as the National Writing System",
      description:
        "A similar bill filed in the House of Representatives aims to promote Baybayin. It mandates government agencies to use Baybayin in signage and literature to revitalize its use.",
      pdfPath: "/docs/SB2440_baybayin_writing.pdf",
    },
  ];

  // ✅ State for currently selected bill
  const [selectedBill, setSelectedBill] = useState(null);

  return (
    <div className="bills-container">
      {/* === Left: List of Bills === */}
      <div className="bills-list-container">
        {bills.map((bill, index) => (
          <div key={index} className="bill-card">
            <h3>{bill.title}</h3>
            <p><strong>Bill ID:</strong> {bill.billID}</p>
            <p>{bill.description}</p>
            <button
              className="view-btn"
              onClick={() => setSelectedBill(bill)} // ✅ Show PDF on the right
            >
              View Full Bill
            </button>
          </div>
        ))}
      </div>

      {/* === Right: PDF Viewer === */}
      <div className="pdf-viewer-container">
        {selectedBill ? (
          <>
            {/* ✅ X Close Button */}
            <button
              className="close-btn"
              onClick={() => setSelectedBill(null)}
            >
              ✖
            </button>

            <h3>{selectedBill.title}</h3>
            <iframe
              src={selectedBill.pdfPath}
              title={selectedBill.title}
              width="100%"
              height="90%"
              style={{
                border: "none",
                borderRadius: "10px",
                background: "white",
              }}
            />
          </>
        ) : (
          <p className="no-selection-text">
            📜 Select a bill from the left to view its PDF here.
          </p>
        )}
      </div>
    </div>
  );
}
