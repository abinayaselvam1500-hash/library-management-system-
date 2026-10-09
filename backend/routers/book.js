const express = require("express");

const {
    issueBook,
    returnBook,
    getBooks,
    getIssueHistory
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);

router.get("/history", getIssueHistory);

router.post("/issue", issueBook);

router.post("/return", returnBook);

module.exports = router;