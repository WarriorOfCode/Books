var connection = require('../db');

function getLists(callback) {
	var selectSql = "SELECT groups.*, COUNT(*) AS members FROM groups, books_groups WHERE groups.id=books_groups.id_group GROUP BY books_groups.id_group ;"
	connection.query(selectSql, callback);
}

function getBooksInLists(callback) {
	var selectSql = "SELECT books_groups.id_group, books.* FROM books_groups, books WHERE books_groups.id_book=books.id ORDER BY books_groups.id_group";
	connection.query(selectSql, callback);
}

function getList(listId, callback) {
	var selectSql = "SELECT groups.Name AS listName, books.* FROM books_groups, books, groups WHERE books_groups.id_book=books.id AND books_groups.id_group=? AND groups.id=?";
	connection.query(selectSql, [listId, listId], callback)
}

function getBookLists(bookId, callback) {
	var selectSql = "SELECT groups.* FROM groups, books_groups WHERE books_groups.id_book=? AND groups.id=books_groups.id_group";
	connection.query(selectSql, bookId, callback);
}

function searchLists(query, callback) {
	var selectSql = "SELECT groups.Name AS listName, groups.id AS id_group, books.* FROM books_groups, books, groups WHERE books_groups.id_book=books.id AND books_groups.id_group=groups.id AND groups.Name LIKE ?";
	connection.query(selectSql, "%"+query+"%", callback);
}

function getNewBooks(callback) {
	connection.query('SELECT * FROM books GROUP BY id DESC LIMIT 4', callback);
}

function getPopBooks(callback) {
	var selectPop = 'SELECT * FROM books WHERE id IN (SELECT id_book FROM books_users GROUP BY id_book ORDER BY COUNT(*) DESC) LIMIT 4';
	connection.query(selectPop, callback);
}

function getRating(callback) {
	connection.query("SELECT * FROM books ORDER by assessment DESC LIMIT 4", callback)
}

module.exports = {
	getLists: getLists,
	getBooksInLists: getBooksInLists,
	getList: getList,
	getBookLists: getBookLists,
	searchLists: searchLists,
	getNewBooks: getNewBooks,
	getPopBooks: getPopBooks,
	getRating: getRating
}