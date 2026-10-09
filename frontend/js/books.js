const tableBody = document.getElementById("booksTableBody");

async function loadBooks() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/books"
        );

        const books = await response.json();

        books.forEach(function(book) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>${book.copies}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {

        console.error(error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    Failed to load books
                </td>
            </tr>
        `;
    }
}

loadBooks();