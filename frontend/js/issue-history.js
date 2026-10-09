const historyTableBody =
    document.getElementById("historyTableBody");

async function loadIssueHistory() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/books/history"
        );

        const history = await response.json();

        historyTableBody.innerHTML = "";

        history.forEach(function(item) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.studentName}</td>
                <td>${item.bookName}</td>
                <td>${new Date(item.issueDate).toLocaleString()}</td>
                <td>${item.status}</td>
                <td>
                    ${
                        item.returnDate
                            ? new Date(item.returnDate).toLocaleString()
                            : "-"
                    }
                </td>
            `;

            historyTableBody.appendChild(row);
        });

    } catch (error) {

        console.error(error);

        historyTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    Failed to load issue history
                </td>
            </tr>
        `;
    }
}

loadIssueHistory();