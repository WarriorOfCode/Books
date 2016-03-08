var connection = require('../db');

/**
 * Get all authors from database.
 */
function getAuthors(callback) {
	connection.query('SELECT * FROM authors', callback);
}

/**
* Delete author by id
*/
function deleteAuthor(authorId, callback) {
	connection.query("DELETE FROM authors WHERE id=?", authorId, callback);
}

function updateAuthor(authorId, name, lastName, patronymic, biography, birthCountry, imageUrl, callback) {
	var updateSql = "UPDATE authors SET name=?, lastName=?, patronymic=?, biography=?, birthCountry=?, imageUrl=? WHERE id=?";
	connection.query(updateSql, [name, lastName, patronymic, biography, birthCountry, imageUrl, authorId], callback);
}
/**
 * Get information about author.
 */
function getAuthorByName(name, lastName, callback) {
	connection.query("SELECT * FROM authors WHERE name = ? AND lastName = ?", [name, lastName], callback);
}

function getAuthorByBookId(bookId, callback) {
	var selectauthor = "SELECT id, name, lastName, patronymic FROM  authors WHERE id IN (SELECT id_author FROM books_authors WHERE id_book=?)";
	connection.query(selectauthor, bookId, callback);
}

function getAuthorInformationById(authorId, callback) {
	connection.query('SELECT * FROM authors WHERE id = ?', authorId, callback);
}

function getAuthorsIdByBookId(bookId, callback) {
	connection.query("SELECT * FROM books_authors WHERE id_book = ?", bookId, callback);
}

/**
 * Add author
 */
function addAuthor(name, lastName, patronymic, birthDate, biography, birthCountry, imageUrl, callback) {
	var insertSql = "INSERT INTO authors (name, lastName, patronymic, birthDate, biography, birthCountry, imageUrl) VALUES (?,?,?,?,?,?,?)";
	connection.query(insertSql, [name, lastName, patronymic, birthDate, biography, birthCountry, imageUrl], callback);
}

function searchAuthors(query, callback) {
	connection.query("SELECT * FROM authors WHERE lastName LIKE ?", "%"+query+"%", callback);
}

/**
* Operations with fact about author
*/
function getFacts(authorId, callback) {
	connection.query("SELECT fact, id FROM facts WHERE id_author=?", authorId, callback);
}

module.exports = {
	getAuthors: getAuthors,
	deleteAuthor: deleteAuthor,
	updateAuthor: updateAuthor,
	getAuthorByName:getAuthorByName,
	getAuthorByBookId: getAuthorByBookId,
	getAuthorInformationById: getAuthorInformationById,
	getAuthorsIdByBookId: getAuthorsIdByBookId,
	addAuthor: addAuthor,
	searchAuthors: searchAuthors,
	getFacts: getFacts
}