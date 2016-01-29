var connection = require('../db');

function getLists(callback) {
	var selectSql = "SELECT groups.*, COUNT(*) AS booksNumber FROM groups, books_groups WHERE groups.id=books_groups.id_group GROUP BY books_groups.id_group ;"
	connection.query(selectSql, callback);
}

function getBooksInLists(callback) {
	var selectSql = "SELECT books_groups.id_group, books.* FROM books_groups, books WHERE books_groups.id_book=books.id ORDER BY books_groups.id_group";
	connection.query(selectSql, callback);
}

module.exports = {
	getLists: getLists,
	getBooksInLists: getBooksInLists
}