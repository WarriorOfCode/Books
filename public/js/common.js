angular
	.module('Books', ['ngAnimate', 'ui.bootstrap', 'pascalprecht.translate'])
	.provider('environment', [environment])
	.config(['environmentProvider', environmentConfig])
	.controller('LogoutCtrl', ['$scope', 'UserService', 'environment', LogoutCtrl])
	.controller('SearchCtrl', ['$scope', SearchCtrl])
	.controller('OfferCtrl', ['$scope', 'UserService', '$translate', OfferCtrl])
	.config(['$translateProvider', TranslationConfig]);

function environment() {
	var DevMode = undefined;
	var UILanguage = undefined;
	this.setDevMode = function(val){
		DevMode = val;
	}
	this.setUILanguage = function(val){
		UILanguage = val;
	}
	this.$get = function(){
		return {
			isDevMode:DevMode,
			isUILanguage: UILanguage
		}
	}
}

function environmentConfig(environmentProvider) {
	environmentProvider.setDevMode(true);
	environmentProvider.setUILanguage("RU");
}

function LogoutCtrl($scope, UserService, environment) {
	$scope.send = function () {
		UserService.logout()
		.success(function(data){
			location.reload();
		})
		.error(function (data) {
			console.log(data);
		});
	};
	console.log(environment.isDevMode)
	console.log(environment.isUILanguage)
}

function SearchCtrl($scope) {
	$scope.query =  decodeURIComponent(location.search.replace("?query=", ""));

	$scope.openModal = function(){
		$('#offersModal').modal();
	};
}

function OfferCtrl($scope, UserService, $translate) {

	$scope.send = function(){
		if ($scope.book){
			UserService.addOffer($scope.book)
			.success(function(data){
				$scope.book= {};
				$translate('message.offer').then(function (data) {
					$scope.message = data;
				});
			})
			.error(function(data){
				console.log(data);
			});
		}
	}
}

function TranslationConfig($translateProvider) {
	var translationsRU = {
		message:{
			offer: 'Спасибо за предложение, книга скоро будет добавлена!',
			emailEmpty: "Поле email не может быть пустым, а люди могут",
			registrationLoginError: "Такой login уже зарегестрирован",
			emailError: "этот Email уже занят",
			registrationSuccess: "Регистрация прошла успешно!",
			registrationError: "Пустые поля или пароль меньше 6 символов не допускаются",
			loginError: "Введён неверный login или пароль",
			changedSuccess: "Изменения сохранены",
			passwordMatchError: "Новый пароль не совпадает с подтверждением",
			passwordError: "Неверный старый пароль",
			bookSuccess: "Книга успешно добавлена",
			bookError: "Такая книга уже зарегестрирована",
			authorError: "Такой автор уже зарегестрирован",
			authorSuccess: "Автор успешно зарегестрирован",
			empty: "Пустые поля не допускаются",
			date: "Проверьте введенную дату",
			emptyExceptPatronymic: "Пустые поля не допускаются, исключая отчество и авторы моложе 11 лет тоже"
		}
	};

	var translationsEN = {
		message:{
			offer: 'Thanks for offer!',
			emailEmpty: "email can not be empty",
			registrationLoginError: "This login is not available",
			emailError: "This email is not available",
			registrationSuccess: "You successfully registered!",
			registrationError: "Fields can not be empty",
			loginError: "Login failed",
			changedSuccess: "Changes saved",
			passwordMatchError: "New password does not match with confirm",
			passwordError: "old password is incorrect",
			bookSuccess: "A book added",
			bookError: "Such book is registered yet",
			authorError: "Such author is registered yet",
			authorSuccess: "An author added",
			empty: "Fields can not be empty",
			date: "Date is incorrect",
			emptyExceptPatronymic: "Fields can not be empty, except patronymic" 
		}
	};
	
	$translateProvider
		.translations('ru', translationsRU)
		.translations('en', translationsEN)
		.preferredLanguage('ru');
}