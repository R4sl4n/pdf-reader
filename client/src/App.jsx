import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UploadPage from './pages/UploadPage'
import BooksPage from './pages/BooksPage'
import Navbar from './components/Navbar'
import ReaderPage from './pages/ReaderPage'



function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/book/:id" element={<ReaderPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App