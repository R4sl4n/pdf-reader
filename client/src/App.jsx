import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import BooksPage from "./pages/BooksPage";
import ReaderPage from "./pages/ReaderPage";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navbar />
              <BooksPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Navbar />
              <UploadPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/book/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <ReaderPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
