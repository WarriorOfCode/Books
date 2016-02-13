var connection = require('../db');
var crypto = require ('crypto');

/**
 * Get all users from database.
 */
function getUsers(callback) {
	connection.query('SELECT * FROM users', callback);
}

/**
 *  Encryption of password
 */
function passwordEncryption(salt, password) {
	var hash = crypto.createHash('sha512')
					.update(salt+password)
					.digest('hex');
	return hash;
}

function getSalt() {
	var salt = Math.round((new Date().valueOf() * Math.random()))+'';
	return salt;
}

/**
 * Operations with books.
 */

function checkisBookUser(bookId, userId, callback) {
	var selectSql = "SELECT * FROM books_users WHERE id_book=? AND id_user=?";
	connection.query(selectSql, [bookId, userId], callback);
}

function addUserBook(bookId, userId, progress, callback) {
	var insertSql ="INSERT INTO books_users (id_book, id_user, progress) VALUES (?,?,?)";
	connection.query(insertSql, [bookId, userId, progress], callback);
}

function deleteUserBook(bookId, userId, progress, callback) {
	var deleteSql = "DELETE FROM books_users WHERE id_book=? AND id_user=? AND progress=?";
	connection.query(deleteSql, [bookId, userId, progress], callback);
}

function deleteAllUserBook(bookId, userId, callback) {
	var deleteSql = "DELETE FROM books_users WHERE id_book=? AND id_user=?";
	connection.query(deleteSql, [bookId, userId], callback);
}

/**
 * Operations with user's information.
 */

function getUserInformation(userId, callback) {
	connection.query("SELECT id, NickName, Name, LastName, Email FROM users WHERE id = ?", userId, callback);
}

function updateUserPassword(password, userId, callback) {
		connection.query("UPDATE users SET password = ? WHERE id = ?", [password, userId], callback);
}

function getInformationByLogin(login, callback) {
	connection.query("SELECT id, NickName, Name, LastName, Email FROM users WHERE NickName = ?", login, callback);
}

/**
 * Operations with friens.
 */
function checkFriend(followerId, followingId, callback) {
	var selectSql = "SELECT id_following FROM friends WHERE id_follower = ? AND id_following = ?";
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
	checkisBookUser: checkisBookUser,
	addUserBook: addUserBook,
	deleteUserBook: deleteUserBook,
	deleteAllUserBook: deleteAllUserBook,
	getUserInformation: getUserInformation,
	updateUserPassword: updateUserPassword,
	getInformationByLogin: getInformationByLogin,
	checkFriend: checkFriend,
	deleteFriend: deleteFriend,
	addfriend: addfriend,
	getUser: getUser,
	insertUser: insertUser,
	checkEmailUniqueness: checkEmailUniqueness,
	updateUserInformation: updateUserInformation,
	passwordEncryption: passwordEncryption,
	getSalt: getSalt
};