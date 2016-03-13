angular
	.module('Books', ['ngAnimate', 'ui.bootstrap', 'pascalprecht.translate'])
	.controller('LogoutCtrl', ['$scope', '$http', LogoutCtrl])
	.controller('SearchCtrl', ['$scope', SearchCtrl])
	.controller('OfferCtrl', ['$scope', '$http', '$translate', OfferCtrl])
	.config(['$translateProvider', TranslationConfig]);


function LogoutCtrl($scope, $http) {
	$scope.send = function () {
		$http.get('/api/out')
		.success(function(data){
			location.reload();
		})
		.error(function (data) {
			console.log(data);
		});
	};
}

function SearchCtrl($scope) {
	$scope.query =  decodeURIComponent(location.search.replace("?query=", ""));

	$scope.openModal = function(){
		$('#offersModal').modal();
	};
}

function OfferCtrl($scope, $http, $translate) {

	$scope.send = function(){
		if ($scope.book){
			$http.put('/api/offer', $scope.book)
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
			authorSuccess: "Автор успешно зарегестрирован"
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
			authorSuccess: "An author added"
		}
	};
	
	$translateProvider
		.translations('ru', translationsRU)
		.translations('en', translationsEN)
		.preferredLanguage('ru');
}