var connection = require('../db');

/**
 * Get all books with authors
 */
function getBooksWithAuthors(callback) {
	selectSql = "SELECT books.*, authors.id AS authorId, authors.Name AS authorName, authors.Last_Name AS authorLastname FROM books_authors, authors, books WHERE books_authors.id_author=authors.id AND books.id=books_authors.id_book";
	connection.query(selectSql, callback);
}

/**
 * Get connections between books and authors
 */
function getConnections(callback) {
	connection.query("SELECT * FROM books_authors", callback);
}
/**
* Delete book by id
*/
function deleteBook(bookId, callback) {
	connection.query("DELETE FROM books WHERE id = ?", bookId, callback);
}

/**
 * Check that db have book with input params
 */
function checkBookUniqueness(bookName, authorId, callback) {
	var selectSql = "SELECT * FROM books_authors WHERE id_book IN (SELECT id FROM books WHERE Name = ?) AND id_author = ?";
	connection.query(selectSql, [bookName, authorId], callback);
}

/**
 * Search book
 */
function searchBook(name, callback) {
	connection.query('SELECT * FROM books WHERE Name LIKE ?', name+"%", callback);
}

/**
 * Add book
 */
function addBookWithISBN(name, description, birthDate, image, ISBN, callback) {
	var insertSqlISBN = "INSERT INTO books (Name, Description, Birth_data, image_url, ISBN) VALUES (?,?,?,?,?)";
	connection.query(insertSqlISBN, [name, description, birthDate, image, ISBN], callback);
}

function addBook(name, description, birthDate, image, callback) {
	var insertSqlBook = "INSERT INTO books (Name, Description, Birth_data, image_url) VALUES (?,?,?,?)";
	connection.query(insertSqlBook, [name, description, birthDate, image], callback);
}

/**
*Get last book id
*/
function getBookId(callback) {
	connection.query("SELECT id FROM books ORDER BY id DESC LIMIT 1", callback);
}

/**
 * Add connection between book and author
 */
function addConnectionBookAuthor(bookId, authors, callback) {
	var insertSqlBA = "INSERT INTO books_authors (id_book, id_author) VALUES (?,?)";
	authors.forEach(function(author){
		connection.query(insertSqlBA, [bookId, author.id], callback);
	});
};

/**
* Update information about book
*/
function updateBook(id, name, description, birthDate, image, isbn, callback) {
	var updateSql = "UPDATE books SET Name=?, Description=?, Birth_data=?, image_url=?, ISBN=? WHERE id=?";
	connection.query(updateSql, [name, description, birthDate, image, isbn, id], callback);
}

function updateConnection(bookId, authorId, callback) {
	connection.query("UPDATE books_authors SET id_author=? WHERE id_book =?", [authorId, bookId], callback);
}

/**
 * Get book
 */
function getBookByISBN (ISBN, callback) {
	connection.query("SELECT * FROM books WHERE ISBN = ?", ISBN, callback);
}

function getBookById(bookId, callback) {
	connection.query('SELECT * FROM books WHERE id = ?', bookId, callback);
}

function getBooksByAuthorId(authorId, callback) {
	var selectbooks = 'SELECT * FROM books WHERE id IN (SELECT id_book FROM books_authors WHERE id_author = ?)';
	connection.query(selectbooks, authorId, callback);
}

function getBooksByUserId (userId, callback) {
	var selectSql = "SELECT books.* FROM books, books_users WHERE books_users.id_user = ? AND books_users.id_book = books.id";
	connection.query(selectSql, userId, callback);
}

function getNewBooks(callback) {
	connection.query('SELECT * FROM books GROUP BY id DESC LIMIT 4', callback);
}

function getPopBooks(callback) {
	var selectPop = 'SELECT * FROM books WHERE id IN (SELECT id_book FROM books_users GROUP BY id_book ORDER BY COUNT(*) DESC) LIMIT 4';
	connection.query(selectPop, callback);
}

function getBookByGroupId(callback) {
	var selectSql = 'SELECT * FROM books WHERE id IN (SELECT id_book FROM books_groups WHERE id_group = 1)';
	connection.query(selectSql, callback);
}

/**
 * Operation with reviews
 */
function addReview(bookId, userId, title, text, callback) {
	var insertSql = "INSERT INTO reviews (id_book, id_user, title, text, birthDate) VALUES (?,?,?,?, Current_date())";
	connection.query(insertSql, [bookId,userId, title, text], callback)
}

function getReviews(bookId, callback) {
	selectSql = "SELECT reviews.*, users.NickName FROM reviews, users WHERE id_book=? AND users.id=reviews.id_user";
	connection.query(selectSql, bookId, callback);
}

module.exports = {
	getBooksWithAuthors: getBooksWithAuthors,
	getConnections: getConnections,
	deleteBook: deleteBook,
	searchBook: searchBook,
	addBookWithISBN: addBookWithISBN,
	addBook: addBook,
	getBookId: getBookId,
	addConnectionBookAuthor: addConnectionBookAuthor,
	updateBook: updateBook,
	updateConnection: updateConnection,
	getBookByISBN: getBookByISBN,
	getBookById: getBookById,
	getBooksByAuthorId: getBooksByAuthorId,
	getBooksByUserId: getBooksByUserId,
	getNewBooks: getNewBooks,
	getPopBooks: getPopBooks,
	getBookByGroupId: getBookByGroupId,
	checkBookUniqueness: checkBookUniqueness,
	addReview: addReview,
	getReviews: getReviews
}