var success = {'error': false};

var changedSuccess = {
	'error': false,
	'message': "Изменения сохранены"};

var  bookOffer = {
	'message': "Спасибо за предложение, книга скоро будет добавлена."};

/**
* About authentication
*/
var passwordError = {
	'error': true,
	'message': "Старый пароль не верный"};

var loginError = {
	'error': true,
	'message': "Ошибка входа!"};

/**
* About authors
*/
var authorError = {
	'error': true,
	'message': "Такой писатель уже зарегистрирован!"};

var authorSuccess = {
	'error': false,
	'message': "Автор успешно зарегистрирован!"};

/**
* About books
*/
var bookError = {
	'error': true,
	'message': "Такая книга уже зарегистрированна!"};

var bookSuccess = {
	'error': false,
	'message': "Книга успешно добавлена!"};

/**
* about registration
*/
var registrationLoginError = {
	'error': true,
	'message': "login занят",
	'emailError': false};

var registrationSuccess = {
	'error': false,
	'message': "Регистрация прошла успешно!"};

var emailError = {
	'error': true,
	'message': "этот Email уже занят",
	'emailError': true};

module.exports = {
	success: success,
	changedSuccess: changedSuccess,
	bookOffer: bookOffer,
	passwordError: passwordError,
	loginError: loginError,
	authorError: authorError,
	authorSuccess: authorSuccess,
	bookError: bookError,
	bookSuccess: bookSuccess,
	registrationLoginError: registrationLoginError,
	registrationSuccess: registrationSuccess,
	emailError: emailError
}