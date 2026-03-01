import { QRCodeSVG } from 'qrcode.react';
import { X, Download } from 'lucide-react';

export default function QRModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  const downloadQR = () => {
    const svg = document.getElementById("student-qr");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${student.matric}-QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative flex flex-col items-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>
        
        <h3 className="text-xl font-bold text-slate-800 mb-1">{student.name}</h3>
        <p className="text-slate-500 text-sm mb-6">{student.matric}</p>

        <div className="bg-slate-50 p-4 rounded-xl border-2 border-dashed border-slate-200">
          <QRCodeSVG 
            id="student-qr"
            value={student.matric} 
            size={200}
            level={"H"}
            includeMargin={true}
          />
        </div>

        <button 
          onClick={downloadQR}
          className="mt-8 w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
        >
          <Download size={18} /> Download ID QR
        </button>
      </div>
    </div>
  );
}