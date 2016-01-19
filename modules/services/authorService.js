var connection = require('../db');

/**
 * Get all authors from database.
 */
function getAuthors(callback) {
	connection.query('SELECT * FROM authors', callback);
}

/**
 * Get information about author.
 */
function getAuthorByName(name, callback) {
	connection.query("SELECT * FROM authors WHERE Name = ?", name, callback);
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


module.exports = {
	getAuthors: getAuthors,
	getAuthorByName:getAuthorByName,
	getAuthorByBookId: getAuthorByBookId,
	getAuthorInformationById: getAuthorInformationById,
	getAuthorsIdByBookId: getAuthorsIdByBookId,
	addAuthor: addAuthor
}