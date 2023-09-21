function openAddBookPopup() {
    var addBookPopupBg = document.getElementById("add-book-popup-bg");
    var addBookPopup = document.getElementById("add-book-popup");
    addBookPopupBg.style.display = "flex";
    addBookPopup.style.display = "block";
  }
  
  function openDeleteBookPopup(id) {
    var books = getBooksFromLocalStorage();
    var bookToDelete = findBookById(books, id);
  
    if (bookToDelete) {
      var deleteBookMsgElement = document.getElementById("delete-book-msg");
      deleteBookMsgElement.innerHTML = `Do you want to delete <b>${bookToDelete.title}</b> book?`;
    }
  
    var deleteBookPopupBg = document.getElementById("delete-book-popup-bg");
    var deleteBookPopup = document.getElementById("delete-book-popup");
    deleteBookPopupBg.style.display = "flex";
    deleteBookPopup.style.display = "block";
  
    removeSubmitDeleteBookListener();
    addSubmitDeleteBookListener(id);
  }
  
  async function submitNewBook() {
    var title = document.getElementById("add-book-title").value;
    var author = document.getElementById("add-book-author").value;
    var topic = document.getElementById("add-book-topic").value;
  
    if (title === "" || author === "" || topic === "") {
      return;
    }
  
    var newBook = {
      id: generateNewBookId(),
      title: title,
      author: author,
      topic: topic,
    };
  
    addBookToLocalStorage(newBook);
    clearAddBookForm();
    await loadBooks();
  }
  

  function searchBookByTitle(value) {
    var books = getBooksFromLocalStorage();
    var table = document.getElementById("books-table");
    clearTableRows(table);
  
    books.forEach(function (book) {
      if (book.title.toLowerCase().includes(value.toLowerCase())) {
        addBookTableRow(table, book);
      }
    });
  }
  
  async function deleteBook(x) {
    var table = document.getElementById("book-list-table");
    table.deleteRow(x.parentNode.parentNode.rowIndex)
  }
  


  async function loadBooks() {
    var books = getBooksFromLocalStorage();
    var table = document.getElementById("books-table");
    clearTableRows(table);
  
    books.forEach(function (book) {
      addBookTableRow(table, book);
    });
  }
  
  function setupCloseAddBookPopup() {
    var addBookPopupBg = document.getElementById("add-book-popup-bg");
    var addBookPopup = document.getElementById("add-book-popup");
    var cancelAddBookBtn = document.getElementById("cancel-add-book-btn");
  
    addBookPopupBg.addEventListener("click", function (event) {
      if (!addBookPopup.contains(event.target)) {
        hideAddBookPopup();
      }
    });
  
    cancelAddBookBtn.addEventListener("click", function (event) {
      hideAddBookPopup();
    });
  }
  
  function setupCloseDeleteBookPopup() {
    var deleteBookPopupBg = document.getElementById("delete-book-popup-bg");
    var deleteBookPopup = document.getElementById("delete-book-popup");
    var cancelDeleteBookBtn = document.getElementById("cancel-delete-book-btn");
  
    deleteBookPopupBg.addEventListener("click", function (event) {
      if (!deleteBookPopup.contains(event.target)) {
        hideDeleteBookPopup();
      }
    });
  
    cancelDeleteBookBtn.addEventListener("click", function (event) {
      hideDeleteBookPopup();
    });
  }
  
  function hideAddBookPopup() {
    var addBookPopupBg = document.getElementById("add-book-popup-bg");
    var addBookPopup = document.getElementById("add-book-popup");
    addBookPopupBg.style.display = "none";
    addBookPopup.style.display = "none";
  }
  
  function hideDeleteBookPopup() {
    var deleteBookPopupBg = document.getElementById("delete-book-popup-bg");
    var deleteBookPopup = document.getElementById("delete-book-popup");
    deleteBookPopupBg.style.display = "none";
    deleteBookPopup.style.display = "none";
  }


  document.addEventListener("DOMContentLoaded", loadBooks);
  document.addEventListener("DOMContentLoaded", setupCloseAddBookPopup);
  document.addEventListener("DOMContentLoaded", setupCloseDeleteBookPopup);
  

  function getBooksFromLocalStorage() {
    var storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    return Array.isArray(storedBooks) ? storedBooks : [];
  }
  
  function findBookById(books, id) {
    return books.find(function (book) {
      return book.id === id;
    });
  }
  
  function generateNewBookId() {
    var books = getBooksFromLocalStorage();
    var lastBook = books[books.length - 1];
    return lastBook ? lastBook.id + 1 : 1;
  }
  
  function addBookToLocalStorage(book) {
    var books = getBooksFromLocalStorage();
    var table = document.getElementById("book-list-table");

    books.push(book);
    saveBooksToLocalStorage(books);
  }
  
  function saveBooksToLocalStorage(books) {
    localStorage.setItem("books", JSON.stringify(books));
  }
  
  function findBookIndexById(books, id) {
    return books.findIndex(function (book) {
      return book.id === id;
    });
  }
  
  function clearAddBookForm() {
    document.getElementById("add-book-title").value = "";
    document.getElementById("add-book-author").value = "";
    document.getElementById("add-book-topic").value = "";
  }
  
  function clearTableRows(table) {
    for (var i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
    }
  }
  
  function addBookTableRow(table, book) {
    var row = table.insertRow(table.rows.length);
    var titleCell = row.insertCell(0);
    var authorCell = row.insertCell(1);
    var topicCell = row.insertCell(2);
    var actionCell = row.insertCell(3);
  
    titleCell.innerHTML = book.title;
    authorCell.innerHTML = book.author;
    topicCell.innerHTML = book.topic;
  
    var deleteButton = document.createElement("a");
    deleteButton.href = "#";
    deleteButton.className = "btn";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      openDeleteBookPopup(book.id);
    };
  
    actionCell.appendChild(deleteButton);
  }
  
  function addSubmitDeleteBookListener(id) {
    var btnSubmitDeleteBook = document.getElementById("delete-book-btn");
    btnSubmitDeleteBook.addEventListener("click", function (event) {
      deleteBookByID(id);
      hideDeleteBookPopup();
    });
  }
  
  function removeSubmitDeleteBookListener() {
    var btnSubmitDeleteBook = document.getElementById("delete-book-btn");
    var clonedBtnSubmitDeleteBook = btnSubmitDeleteBook.cloneNode(true);
    btnSubmitDeleteBook.parentNode.replaceChild(clonedBtnSubmitDeleteBook, btnSubmitDeleteBook);
  }
  
 