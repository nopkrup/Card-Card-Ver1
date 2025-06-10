import { useState } from "react";

function App() {
  const [price, setPrice] = useState(0);
  const [result, setResult] = useState(null);

  const cardOptions = [
    { price: 5000, value: 6500 },
    { price: 10000, value: 13000 },
    { price: 20000, value: 26000 },
    { price: 30000, value: 39000 },
    { price: 50000, value: 65000 },
    { price: 100000, value: 130000 },
  ];

  const calculate = () => {
    let remaining = price;
    const cardsUsed = [];
    let totalCashCardValue = 0;
    let totalPaid = 0;

    for (let i = cardOptions.length - 1; i >= 0; i--) {
      const card = cardOptions[i];
      const count = Math.floor(remaining / card.value);
      if (count > 0) {
        cardsUsed.push({ ...card, count });
        totalCashCardValue += card.value * count;
        totalPaid += card.price * count;
        remaining -= card.value * count;
      }
    }

    if (remaining > 0) {
      const smallestCard = cardOptions[0];
      cardsUsed.push({ ...smallestCard, count: 1 });
      totalCashCardValue += smallestCard.value;
      totalPaid += smallestCard.price;
    }

    const discountPercent = (((totalCashCardValue - totalPaid) / totalCashCardValue) * 100).toFixed(2);

    setResult({
      cardsUsed,
      totalPaid,
      totalCashCardValue,
      discountPercent,
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>เครื่องคำนวณการซื้อ Cash Card</h1>
      <input
        type="number"
        placeholder="กรอกราคาสินค้า (บาท)"
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        style={{ marginTop: 16, padding: 8, width: "100%" }}
      />
      <button onClick={calculate} style={{ marginTop: 16, padding: 8, width: "100%" }}>
        คำนวณ
      </button>

      {result && (
        <div style={{ marginTop: 24 }}>
          <p><strong>ต้องใช้บัตร Cash Card ดังนี้:</strong></p>
          <ul>
            {result.cardsUsed.map((card, index) => (
              <li key={index}>
                บัตรมูลค่า {card.price.toLocaleString()} บาท จำนวน {card.count} ใบ (ได้รับ {card.value.toLocaleString()} บาท/ใบ)
              </li>
            ))}
          </ul>
          <p>มูลค่า Cash Card รวม: {result.totalCashCardValue.toLocaleString()} บาท</p>
          <p>จำนวนเงินจริงที่ต้องชำระ: {result.totalPaid.toLocaleString()} บาท</p>
          <p>ส่วนลดที่ได้รับ: {result.discountPercent}%</p>
        </div>
      )}
    </div>
  );
}

export default App;