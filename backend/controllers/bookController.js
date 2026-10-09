const { readDatabase, writeDatabase } = require("../database");

// Issue Book
function issueBook(req, res) {
    try {
        const { studentName, bookName } = req.body;

        if (!studentName || !bookName) {
            return res.status(400).json({
                message: "Student name and book name are required"
            });
        }

        const database = readDatabase();

        const book = database.books.find(
            item => item.name === bookName
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (book.copies <= 0) {
            return res.status(400).json({
                message: "Book is not available"
            });
        }

        const newIssue = {
            id: Date.now(),
            studentName: studentName,
            bookName: bookName,
            issueDate: new Date().toISOString(),
            status: "Issued"
        };

        database.issues.push(newIssue);

        book.copies = book.copies - 1;

        writeDatabase(database);

        res.status(201).json({
            message: "Book issued successfully",
            issue: newIssue
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

function getBooks(req, res) {
    try {
        const database = readDatabase();

        res.json(database.books);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

// Get Issue History
function getIssueHistory(req, res) {
    try {
        const database = readDatabase();

        res.json(database.issues);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}
//return book
function returnBook(req, res) {
    try {
        const { studentName, bookName } = req.body;

        if (!studentName || !bookName) {
            return res.status(400).json({
                message: "Student name and book name are required"
            });
        }

        const database = readDatabase();

        const issue = database.issues.find(
            item =>
                item.studentName === studentName &&
                item.bookName === bookName &&
                item.status === "Issued"
        );

        if (!issue) {
            return res.status(404).json({
                message: "Issued book not found"
            });
        }

        const book = database.books.find(
            item => item.name === bookName
        );

        issue.status = "Returned";
        issue.returnDate = new Date().toISOString();

        if (book) {
            book.copies = book.copies + 1;
        }

        writeDatabase(database);

        res.json({
            message: "Book returned successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}
module.exports = {
    issueBook,
    returnBook,
    getBooks,
    getIssueHistory
};