var connection = require('../db');

/**
 * Get all books
 */
function getBooks(callback) {
	connection.query("SELECT * FROM books", callback);
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
 * Add connection between book and author
 */

function addConnectionBookAuthor(authorId, callback) {
	var insertSqlBA = "INSERT INTO books_authors (id_book, id_author) VALUES (?,?)";
	connection.query("SELECT id FROM books ORDER BY id DESC LIMIT 1", function(err, rows0){
		if (err) throw err;
		connection.query(insertSqlBA, [rows0[0].id, authorId], callback);
	});
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

module.exports = {
	getBooks: getBooks,
	deleteBook: deleteBook,
	searchBook: searchBook,
	addBookWithISBN: addBookWithISBN,
	addBook: addBook,
	addConnectionBookAuthor: addConnectionBookAuthor,
	getBookByISBN: getBookByISBN,
	getBookById: getBookById,
	getBooksByAuthorId: getBooksByAuthorId,
	getBooksByUserId: getBooksByUserId,
	getNewBooks: getNewBooks,
	getPopBooks: getPopBooks,
	getBookByGroupId: getBookByGroupId,
	checkBookUniqueness: checkBookUniqueness
}