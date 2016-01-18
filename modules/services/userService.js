var connection = require('../db');


/**
 * Get all users from database.
 */
function getUsers(callback) {
	connection.query('SELECT * FROM users', callback);
}

/**
 * Operations with books.
 */
function findUserBook(bookId, userId, callback) {
	var selectSql = "SELECT * FROM books_users WHERE id_book = ? AND id_user = ?";
	connection.query(selectSql, [bookId, userId], callback);
}

function addUserBook(bookId, userId, callback) {
	var insertSql ="INSERT INTO books_users (id_book, id_user) VALUES (?,?)";
	connection.query(insertSql, [bookId, userId], callback);
}

function deleteUserBook(bookId, userId, callback) {
	var deleteSql = "DELETE FROM books_users WHERE id_book = ? AND id_user = ?";
	connection.query(deleteSql, [bookId, userId], callback);
}
/**
 * Operations with user's information.
 */

function getUserInformation(userId, callback) {
	connection.query("SELECT * FROM users WHERE id = ?", userId, callback);
}

function updateUserPassword(password, userId, callback) {
	connection.query("UPDATE users SET password = ? WHERE id = ?", [password, userId], callback);
}

function getInformationFromLogin(login, callback) {
	connection.query("SELECT * FROM users WHERE NickName = ?", login, callback);
}

/**
 * Operations with friens.
 */
function getFriend(followerId, followingId, callback) {
	var selectSql = "SELECT * FROM friends WHERE id_follower = ? AND id_following = ?";
	connection.query(selectSql, [followerId, followingId], callback);
}

function deleteFriend(followerId, followingId, callback) {
	var deleteSql = "DELETE FROM friends WHERE id_follower = ? AND id_following = ?";
	connection.query(deleteSql, [followerId, followingId], callback); 
}

function addfriend(followerId, followingId, callback) {
	var insertSql = "INSERT INTO friends (id_follower, id_following) VALUES (?,?)";
	connection.query(insertSql, [followerId, followingId], callback);
}

/**
 * Operations with Email.
 */
function getUser(email, login, callback) {
	var selectSql = "SELECT Email FROM users WHERE Email = ? OR NickName =?";
	connection.query(selectSql, [email, login], callback);
}

function insertUser(email, password, login, salt, callback) {
	var insertSql = "INSERT INTO users (Email, password, NickName, salt) VALUES (?,?,?,?)";
	connection.query(insertSql, [email, password, login, salt], callback);
}

function checkEmailUniqueness(email, userId, callback) {
	var selectSql = "SELECT * FROM users WHERE Email = ? AND id != ?";
	connection.query(selectSql, [email, userId], callback);
}

function updateUserInformation(name, lastName, email, userId, callback) {
	var updateSql = "UPDATE users SET Name = ?, LastName = ?, Email =? WHERE id = ?";
	connection.query(updateSql, [name, lastName, email, userId], callback);
}

module.exports = {
	getUsers: getUsers,
	findUserBook: findUserBook,
	addUserBook: addUserBook,
	deleteUserBook: deleteUserBook,
	getUserInformation: getUserInformation,
	updateUserPassword: updateUserPassword,
	getInformationFromLogin: getInformationFromLogin,
	getFriend: getFriend,
	deleteFriend: deleteFriend,
	addfriend: addfriend,
	getUser: getUser,
	insertUser: insertUser,
	checkEmailUniqueness: checkEmailUniqueness,
	updateUserInformation: updateUserInformation
};