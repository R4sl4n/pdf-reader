import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import API from "../api/index";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ReaderPage = () => {
  const { id } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageText, setPageText] = useState("");
  const [rate, setRate] = useState(1);
  const [bookId, setBookId] = useState(null);

  useEffect(() => {
    API.get('/api/books').then(res => {
      const book = res.data.find(b => b.filePath.split('\\').pop() === id)
      if (book) {
        setPageNumber(book.currentPage)
        setBookId(book.id)
      }
    })
  }, [])

  const changePage = (newPage) => {
    setPageNumber(newPage)
    if (bookId) API.put(`/api/books/${bookId}`, { currentPage: newPage })
  }

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const onPageLoadSuccess = async (page) => {
    const textContent = await page.getTextContent();
    const text = textContent.items.map(item => item.str).join(" ");
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
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 60px)" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px 16px",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        flexShrink: 0,
      }}>
        <button className="btn btn-dark" onClick={() => changePage(pageNumber - 1)} disabled={pageNumber <= 1}>← Prev</button>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>{pageNumber} / {numPages}</span>
        <button className="btn btn-dark" onClick={() => changePage(pageNumber + 1)} disabled={pageNumber >= numPages}>Next →</button>
        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }} />
        <button className="btn btn-green" onClick={speak}>🔊 Listen</button>
        <button className="btn btn-dark" onClick={stopSpeaking}>⏹ Stop</button>
        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }} />
        <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} style={{ width: "80px" }} />
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>Speed: {rate}</span>
      </div>

      <div style={{ flex: 1, overflow: "auto", display: "flex", justifyContent: "center", padding: "24px" }}>
        <Document file={`http://localhost:5000/uploads/${id}`} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} onLoadSuccess={onPageLoadSuccess} />
        </Document>
      </div>
    </div>
  );
};

export default ReaderPage;