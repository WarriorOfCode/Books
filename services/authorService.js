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

function updateAuthor(authorId, name, lastName, patronymic, biography, birthCountry, image, callback) {
	var updateSql = "UPDATE authors SET Name=?, Last_Name=?, patronymic=?, Biography=?, Counry_of_birth=?, image_url=? WHERE id=?";
	connection.query(updateSql, [name, lastName, patronymic, biography, birthCountry, image, authorId], callback);
}
/**
 * Get information about author.
 */
function getAuthorByName(name, lastName, callback) {
	connection.query("SELECT * FROM authors WHERE Name = ? AND Last_Name = ?", [name, lastName], callback);
}

function getAuthorByBookId(bookId, callback) {
	var selectauthor = "SELECT * FROM  authors WHERE id IN (SELECT id_author FROM books_authors WHERE id_book=?)";
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
function addAuthor(name, lastName, patronymic, birthDate, biography, birthCountry, image, callback) {
	var insertSql = "INSERT INTO authors (Name, Last_Name, patronymic, Birth_date, Biography, Counry_of_birth, image_url) VALUES (?,?,?,?,?,?,?)";
	connection.query(insertSql, [name, lastName, patronymic, birthDate, biography, birthCountry, image], callback);
}

function searchAuthors(query, callback) {
	connection.query("SELECT * FROM authors WHERE Last_Name LIKE ?", "%"+query+"%", callback);
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
	searchAuthors: searchAuthors
}