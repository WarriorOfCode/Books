var connection = require('../db');

function getLists(callback) {
	var selectSql = "SELECT groups.*, COUNT(*) AS booksNumber FROM groups, books_groups WHERE groups.id=books_groups.id_group GROUP BY books_groups.id_group ;"
	connection.query(selectSql, callback);
}

function getBooksInLists(callback) {
	var selectSql = "SELECT books_groups.id_group, books.* FROM books_groups, books WHERE books_groups.id_book=books.id ORDER BY books_groups.id_group";
	connection.query(selectSql, callback);
}

function getList(listId, callback){
	var selectSql = "SELECT groups.Name AS listName, books.* FROM books_groups, books, groups WHERE books_groups.id_book=books.id AND books_groups.id_group=? AND groups.id=?";
	connection.query(selectSql, [listId, listId], callback)
}

function getBookLists(bookId, callback){
	var selectSql = "SELECT groups.* FROM groups, books_groups WHERE books_groups.id_book=? AND groups.id=books_groups.id_group";
	connection.query(selectSql, bookId, callback);
}

module.exports = {
	getLists: getLists,
	getBooksInLists: getBooksInLists,
	getList: getList,
	getBookLists: getBookLists
}