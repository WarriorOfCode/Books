angular
	.module('Books')
	.controller('LoginCtrl', ['$scope', '$http', '$location', '$translate', LoginCtrl]);

function LoginCtrl($scope, $http, $location, $translate) {
    $scope.sendData = function () {
		$http.post('/api/login', $scope.user)
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