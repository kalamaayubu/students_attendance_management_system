import Image from "next/image";

const QRScannerEffect = ({ qrCodeSrc, isScanning }) => {
  return (
    <div
      className={`${
        isScanning ? "animate-pulse border-gray-900" : ""
      } relative w-64 h-64 border-4 border-gray-400 rounded-lg overflow-hidden`}
    >
      {/* QR Code */}
      <Image
        src={qrCodeSrc}
        alt="QR Code"
        layout="fill"
        objectFit="cover"
        className="absolute"
      />

      {/* Scanning Effect */}
      <div className={`${isScanning ? "scan-overlay" : ""}`}></div>
    </div>
  );
};

export default QRScannerEffect;
