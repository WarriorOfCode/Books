angular
	.module('Books', ['ngAnimate', 'ui.bootstrap', 'pascalprecht.translate'])
	.controller('LogoutCtrl', ['$scope', '$http', LogoutCtrl])
	.controller('SearchCtrl', ['$scope', SearchCtrl])
	.controller('OfferCtrl', ['$scope', '$http', '$translate', OfferCtrl])
	.config(['$translateProvider', function ($translateProvider) {
		$translateProvider
			.translations('en', translations)
			.preferredLanguage('en');
}]);

var translations = {
	message:{
		offer: 'Спасибо за предложение, книга скоро будет добавлена!',
		emailEmpty: "Поле email не может быть пустым, а люди могут",
		loginError: "Такой login уже зарегестрирован",
		'emailError': "этот Email уже занят",
		'registrationSuccess': "Регистрация прошла успешно!",
		'registrationError': "Пустые поля или пароль меньше шести символов не допускаются"
	}
};

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
				//$scope.message = data["message"];
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