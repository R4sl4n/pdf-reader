const Router = require("express").Router;
const {
  getBooks,
  createBook,
  upload,
  updatePage,
  deleteBook,
} = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

router.get("/books", authMiddleware, getBooks);
router.post("/books", authMiddleware, upload.single("file"), createBook);
router.put("/books/:id", authMiddleware, updatePage);
router.delete("/books/:id", authMiddleware, deleteBook);

module.exports = router;
