var connection = require('../db');
var crypto = require ('crypto');

/**
 * Get all users from database.
 */
function getUsers(callback) {
	connection.query('SELECT * FROM users', callback);
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
	connection.query("SELECT id, login, name, lastName, email FROM users WHERE id = ?", userId, callback);
}

function updateUserPassword(password, userId, callback) {
	var salt = Math.round((new Date().valueOf() * Math.random()))+'';
	var hash = crypto.createHash('sha512')
					.update(salt+password)
					.digest('hex');
	connection.query("UPDATE users SET password = ?, salt=? WHERE id = ?", [hash, salt, userId], callback);
}

function getInformationByLogin(login, callback) {
	connection.query("SELECT id, login, name, lastName, email FROM users WHERE login = ?", login, callback);
}

function checkPassword(login, password, callback){
	connection.query("SELECT password, salt, id, login, permissions FROM users WHERE login=?", login, function(err, rows){
		if (err) throw err;
		if (rows.length>0){
			var checkPassword = crypto.createHash('sha512')
						.update(rows[0].salt+password)
						.digest('hex');

			var user = {'id': rows[0].id,
						'permissions': rows[0].permissions,
						'login': rows[0].login};
			(rows[0].password==checkPassword) ? callback(1, user) : callback(0);
		} else {
			callback(0)
		}
	});
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

function getFollower(userId, callback) {
	var selectSql = "SELECT friends.id_follower, users.login FROM friends, users WHERE id_following=? and users.id = friends.id_follower";
	connection.query(selectSql, userId, callback);
}

function getFollowing(userId, callback) {
	var selectSql = "SELECT friends.id_following, users.login FROM friends, users WHERE id_follower=? and users.id = friends.id_following"
	connection.query(selectSql, userId, callback);
}

/**
 * Operations with Email.
 */
function getUser(email, login, callback) {
	var selectSql = "SELECT email FROM users WHERE email = ? OR login =?";
	connection.query(selectSql, [email, login], callback);
}

function insertUser(email, password, login, callback) {
	var salt = Math.round((new Date().valueOf() * Math.random()))+'';
	var hash = crypto.createHash('sha512')
					.update(salt+password)
					.digest('hex');
	var insertSql = "INSERT INTO users (email, password, login, salt) VALUES (?,?,?,?)";
	connection.query(insertSql, [email, hash, login, salt], callback);
}

function checkEmailUniqueness(email, userId, callback) {
	var selectSql = "SELECT * FROM users WHERE email = ? AND id != ?";
	connection.query(selectSql, [email, userId], callback);
}

function updateUserInformation(name, lastName, email, userId, callback) {
	var updateSql = "UPDATE users SET name = ?, lastName = ?, email = ? WHERE id = ?";
	connection.query(updateSql, [name, lastName, email, userId], callback);
}

function checkLogin(login, callback) {
	connection.query("SELECT id FROM users WHERE login = ?", login, callback);
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
	checkPassword: checkPassword,
	checkFriend: checkFriend,
	getFollower: getFollower,
	getFollowing: getFollowing,
	deleteFriend: deleteFriend,
	addfriend: addfriend,
	getUser: getUser,
	insertUser: insertUser,
	checkEmailUniqueness: checkEmailUniqueness,
	updateUserInformation: updateUserInformation,
	checkLogin: checkLogin
};