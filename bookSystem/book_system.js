let books = [];
let editingIndex = null;  // Variable to store the index of the book being edited

// Function to add a new book to the books array
function addBook() {
    const bookName = document.getElementById('bookName').value;
    const authorName = document.getElementById('authorName').value;
    const bookDescription = document.getElementById('bookDescription').value;
    const pagesNumber = parseInt(document.getElementById('pagesNumber').value);

    // Check if all fields are filled in correctly and pagesNumber is a valid number
    if (bookName && authorName && bookDescription && !isNaN(pagesNumber)) {
        const book = {
            name: bookName,
            authorName: authorName,
            bookDescription: bookDescription,
            pagesNumber: pagesNumber
        };

        if (editingIndex !== null) {
            // If editing an existing book, update its details
            books[editingIndex] = book;
            editingIndex = null;  // Reset editing index
        } else {
            // If not editing, add the new book to the array
            books.push(book);
        }

        // Display the updated list of books
        showbooks();

        // Clear input fields for next entry
        clearInputs();
    } else {
        alert('Please fill in all fields correctly.');
    }
}

// Function to show all books in the array
function showbooks() {
    const booksDiv = books.map((book, index) => 
        `<h1>Book Number: ${index + 1}</h1>
        <p><strong>Book Name: </strong>${book.name}</p>
        <p><strong>Author Name:</strong> ${book.authorName}</p>
        <p><strong>Book Description:</strong> ${book.bookDescription}</p>
        <p><strong>No. of Pages:</strong> ${book.pagesNumber} page(s)</p>
        <!-- Edit and Delete buttons for each book -->
        <button onclick="editbook(${index})">Edit</button>
        <button onclick="deletebook(${index})">Delete</button>`
    );
    document.getElementById('books').innerHTML = booksDiv.join('');
}

// Function to clear all input fields
function clearInputs() {
    document.getElementById('bookName').value = '';
    document.getElementById('authorName').value = '';
    document.getElementById('bookDescription').value = '';
    document.getElementById('pagesNumber').value = '';
}

// Function to edit a specific book
function editbook(index) {
    // Set the input fields to the current book's data
    const book = books[index];
    document.getElementById('bookName').value = book.name;
    document.getElementById('authorName').value = book.authorName;
    document.getElementById('bookDescription').value = book.bookDescription;
    document.getElementById('pagesNumber').value = book.pagesNumber;

    // Set editingIndex to the index of the book being edited
    editingIndex = index;
}

// Function to delete a specific book
function deletebook(index) {
    // Remove the book from the array
    books.splice(index, 1);

    // Display the updated list of books
    showbooks();
}
