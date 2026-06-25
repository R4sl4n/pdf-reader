import { useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ReaderPage = () => {
  const { id } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageText, setPageText] = useState("");
  const [rate, setRate] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const onPageLoadSuccess = async (page) => {
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item) => item.str).join(" ");
    setPageText(text);
  };

  const speak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(pageText);
    utterance.lang = "ru-RU";
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => window.speechSynthesis.cancel();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)' }}>
      
      {/* Панель управления */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 24px',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        flexShrink: 0
      }}>
        <button className="btn btn-dark" onClick={() => setPageNumber(p => p - 1)} disabled={pageNumber <= 1}>← Prev</button>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
          {pageNumber} / {numPages}
        </span>
        <button className="btn btn-dark" onClick={() => setPageNumber(p => p + 1)} disabled={pageNumber >= numPages}>Next →</button>
        
        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
        
        <button className="btn btn-green" onClick={speak}>🔊 Listen</button>
        <button className="btn btn-dark" onClick={stopSpeaking}>⏹ Stop</button>
        
        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
        
        <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} style={{ width: '80px' }} />
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Speed: {rate}</span>
      </div>

      {/* PDF */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '24px' }}>
        <Document
          file={`http://localhost:5000/uploads/${id}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} onLoadSuccess={onPageLoadSuccess} />
        </Document>
      </div>

    </div>
  );
};

export default ReaderPage;