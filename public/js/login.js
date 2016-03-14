angular
	.module('Books')
	.controller('LoginCtrl', ['$scope', 'UserService', '$location', '$translate', LoginCtrl]);

function LoginCtrl($scope, UserService, $location, $translate) {
    $scope.sendData = function () {
		UserService.login($scope.user)
		.success(function(data){
			if(!data)
				location.href = '/';
			else {
				$translate('message.loginError').then(function (data) {
					$scope.message = data;
				});
			}
		})
		.error(function (data) {
			console.log(data);
		});
    };
}