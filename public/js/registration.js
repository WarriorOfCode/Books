angular
	.module('Books')
	.controller('RegistrationCtrl', ['$scope', 'UserService', '$translate', RegistrationCtrl]);
function RegistrationCtrl($scope, UserService, $translate) {

	$scope.checkEmail = function () {
		UserService.checkEmail($scope.user.email)
		.success(function(data){
			if (data){
				$translate('message.emailError').then(function (data) {
					$scope.message = data;
				});
			} else {
				$scope.message = undefined;
			}
		})
		.error(function(data){
			console.log(data);
		});
	}

	$scope.checkLogin = function () {
		UserService.checkLogin($scope.user.login)
		.success(function(data){
			if (data){
				$translate('message.registrationLoginError').then(function (data) {
					$scope.messageLogin = data;
				});
			} else {
				$scope.messageLogin = undefined;
			}
		})
	}

	$scope.sendData = function () {
    	if ($scope.user.login && $scope.user.email && $scope.user.password && $scope.user.login.length<21){
			UserService.addUser($scope.user)
			.success(function(data){
				$scope.error = data;
				var messages = [
					'message.registrationSuccess',
					'message.emailError',
					'message.registrationLoginError'
				];
				$translate(messages[data]).then(function (data) {
					$scope.message = data;
				});
				if (!data)
					location.href = '/';
			})
			.error(function (data) {
				console.log(data);
			});
			
		} else {
			$translate('message.registrationError').then(function (data) {
				$scope.message = data;
			});
			$scope.error = true;
		};
	};
}