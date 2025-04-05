// components/BarcodeScanner.js
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import the scanner to avoid SSR issues
const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

export default function BarcodeScanner({ onScan }) {
  const [scanned, setScanned] = useState(false);

  const handleScan = (err, result) => {
    if (result && !scanned) {
      setScanned(true);
      onScan(result.text);
    }
  };

  return (
    <div>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={handleScan}
      />
    </div>
  );
}
