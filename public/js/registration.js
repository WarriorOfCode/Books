angular
	.module('Books')
	.controller('RegistrationCtrl', ['$scope', '$http', '$translate', RegistrationCtrl]);
function RegistrationCtrl($scope, $http, $translate) {
	$scope.sendData = function () {
    	if ($scope.user.login && $scope.user.email && $scope.user.password && $scope.user.login.length<21){
			$http.put('/api/user', $scope.user)
			.success(function(data){
				$scope.error = data;
				switch(data){
					case 0:
						$translate('message.registrationSuccess').then(function (data) {
							$scope.message = data;
						});
						location.href = '/';
						break;
					case 1:
						$translate('message.emailError').then(function (data) {
							$scope.message = data;
						});
						break;
					case 2:
						$translate('message.loginError').then(function (data) {
							$scope.message = data;
						});
						break;
				}
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