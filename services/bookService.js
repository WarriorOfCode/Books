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
function searchBooks(name, callback) {
	connection.query('SELECT * FROM books WHERE Name LIKE ?', "%"+name+"%", callback);
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

function updateConnection(bookId, authors, callback) {
	connection.query("DELETE FROM books_authors WHERE id_book=?", bookId, callback);
	authors.forEach(function(author){
		connection.query("INSERT INTO books_authors (id_book, id_author) VALUES (?,?)", [bookId, author.id], callback);
	});
};

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
	var selectSql = "SELECT books.*, books_users.progress FROM books, books_users WHERE books_users.id_user = ? AND books_users.id_book = books.id";
	connection.query(selectSql, userId, callback);
}

/**
 * Operation with reviews
 */
function addReview(bookId, userId, title, text, callback) {
	var insertSql = "INSERT INTO reviews (id_book, id_user, title, text, birthDate) VALUES (?,?,?,?, Current_date())";
	connection.query(insertSql, [bookId,userId, title, text], callback)
}

function getReviews(bookId, callback) {
	var selectSql = "SELECT reviews.*, users.NickName FROM reviews, users WHERE id_book=? AND users.id=reviews.id_user";
	connection.query(selectSql, bookId, callback);
}

function deleteReview(reviewId, userId, callback) {
	connection.query("DELETE FROM reviews WHERE id=? AND id_user=?", [reviewId, userId], callback);
}

function getUserReview(bookId, userId, callback) {
	connection.query("SELECT * FROM reviews WHERE id_book=? AND id_user=?", [bookId, userId], callback);
}

function getUserReviews(userId, callback) {
	var selectSql = "select reviews.*, books.Name from reviews, books where id_user=? and reviews.id_book=books.id";
	connection.query(selectSql, userId, callback);
}

/**
 * Operation with citations
 */
function getCitations(bookId, callback) {
	var selectSql = "SELECT citations.*, users.NickName FROM citations, users WHERE id_book=? AND users.id=citations.id_user";
	connection.query(selectSql, bookId, callback);
}

function getCitation(citationId, callback) {
	connection.query("SELECT id_user FROM citations WHERE id=?", citationId, callback);
}

function addCitation(bookId, userId, text, callback) {
	var insertSql = "INSERT INTO citations (id_book, id_user, text, birthDate) VALUES (?,?,?, Current_date())";
	connection.query(insertSql, [bookId, userId, text], callback);
}

function deleteCitation(citationId, userId, callback) {
	connection.query("DELETE FROM citations WHERE id=? AND id_user=?", [citationId, userId], callback);
}

function getCitationsByUserId(userId, callback) {
	var selectSql = "SELECT citations.*, books.Name FROM citations, books  WHERE citations.id_user=? and citations.id_book=books.id";
	connection.query(selectSql, userId, callback);
}

/**
 * Operation with offers
 */
function addOffer(bookName, author, userId, link, callback) {
	var insertSql = "INSERT INTO offers (name, author, id_user, link) VALUES (?,?,?,?)";
	connection.query(insertSql, [bookName, author, userId, link], callback);
}

function getOffers(callback) {
	connection.query("SELECT * FROM offers", callback);
}

function deleteOffer(offerId, callback) {
	connection.query("DELETE FROM offers WHERE id = ?", offerId, callback);
}

/**
 * Operations with assessment.
 */
function addMark(userId, bookId, mark, callback) {
	var insertSql = "INSERT INTO assessments (id_user, id_book, assessment) VALUES (?,?,?)";
	connection.query(insertSql, [userId, bookId, mark], callback);
}

function getMarkBook(userId, bookId, callback) {
	connection.query("SELECT * FROM assessments WHERE id_user=? AND id_book=?", [userId, bookId], callback);
}

function updateMark(userId, bookId, mark, callback) {
	var updateSql = "UPDATE assessments SET assessment=? WHERE id_user=? AND id_book=?";
	connection.query(updateSql,[mark, userId, bookId], callback);
}

function deleteMark(userId, bookId, callback) {
	connection.query("DELETE FROM assessments WHERE id_user =? AND id_book=?", [userId, bookId], callback);
}

/**
* For schedule
*/

function getAssessments(bookId, callback) {
	connection.query("SELECT assessment FROM assessments WHERE id_book = ?", bookId, callback);
}

function addAssessments(assessment, id, callback) {
	var updateSql = "UPDATE books SET assessment = ? WHERE id =?";
	connection.query(updateSql, [assessment, id], callback);
}

function getAllBookId(callback) {
	connection.query("SELECT id FROM books", callback);
}

/**
* Operations with fact about book
*/
function getFacts(bookId, callback) {
	connection.query("SELECT fact, id FROM facts WHERE id_book=?", bookId, callback);
}

module.exports = {
	getBooksWithAuthors: getBooksWithAuthors,
	getConnections: getConnections,
	deleteBook: deleteBook,
	searchBooks: searchBooks,
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
	checkBookUniqueness: checkBookUniqueness,
	addReview: addReview,
	getReviews: getReviews,
	deleteReview: deleteReview,
	getUserReview: getUserReview,
	getUserReviews: getUserReviews,
	getCitation: getCitation,
	getCitations: getCitations,
	addCitation: addCitation,
	deleteCitation: deleteCitation,
	getCitationsByUserId: getCitationsByUserId,
	addOffer: addOffer,
	getOffers: getOffers,
	deleteOffer: deleteOffer,
	addMark: addMark,
	getMarkBook: getMarkBook,
	updateMark: updateMark,
	deleteMark: deleteMark,
	getAssessments: getAssessments,
	addAssessments: addAssessments,
	getAllBookId: getAllBookId,
	getFacts: getFacts
}