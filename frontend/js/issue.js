const issueForm = document.getElementById("issueForm");

if (issueForm) {

    issueForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const studentName =
            document.getElementById("studentName").value;

        const bookName =
            document.getElementById("bookName").value;

        try {

            const response = await fetch(
                "http://localhost:5000/api/books/issue",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        studentName: studentName,
                        bookName: bookName
                    })
                }
            );

            const data = await response.json();

            document.getElementById("message").textContent =
                data.message;

        } catch (error) {

            document.getElementById("message").textContent =
                "Server connection failed";
        }
    });
}