import { useState } from "react";
import API from "../api/index";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("file", file);

      await API.post("/api/books", formData);
      alert("Book uploaded!");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <h1>Upload Book</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleSubmit} className="btn btn-dark">
        Загрузка
      </button>
    </div>
  );
};

export default UploadPage;
