// app/barcode/page.jsx (or pages/barcode.js if not using app dir)
"use client";
import { useState } from "react";
import BarcodeScanner from "@/components/BarcodeScanner";

export default function BarcodePage() {
  const [scannedCode, setScannedCode] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const saveProduct = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode: scannedCode, name, quantity })
    });
    alert("Product saved!");
  };

  return (
    <div className="p-4">
      <BarcodeScanner onScan={setScannedCode} />
      {scannedCode && (
        <div className="mt-4">
          <p>Barcode: {scannedCode}</p>
          <input
            className="border p-1"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-1 ml-2"
            type="number"
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button className="bg-blue-500 text-white p-2 ml-2" onClick={saveProduct}>
            Save Product
          </button>
        </div>
      )}
    </div>
  );
}
