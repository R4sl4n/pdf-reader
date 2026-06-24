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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = async (page) => {
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item) => item.str).join(" ");
    setPageText(text);
  };

  const speak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(pageText);
    utterance.lang = "ru-RU";
    utterance.rate = rate; // скорость (0.5 - 2)
    utterance.pitch = 1; // тон голоса (0 - 2)
    utterance.volume = 1; // громкость (0 - 1)
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div>
      <Document
        file={`http://localhost:5000/uploads/${id}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} onLoadSuccess={onPageLoadSuccess} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button
        onClick={() => setPageNumber((p) => p - 1)}
        disabled={pageNumber <= 1}
      >
        Previous
      </button>
      <button
        onClick={() => setPageNumber((p) => p + 1)}
        disabled={pageNumber >= numPages}
      >
        Next
      </button>
      <button onClick={speak}>🔊 Listen</button>
      <button onClick={stopSpeaking}>⏹ Stop</button>
      <input
        type="range"
        min="0.5"
        max="5"
        step="0.1"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
      />
      <span>Speed: {rate}</span>
    </div>
  );
};

export default ReaderPage;
