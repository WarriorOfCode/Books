angular
	.module('Books')
	.controller('RegistrationCtrl', ['$scope', '$http', RegistrationCtrl]);
function RegistrationCtrl($scope, $http) {
	$scope.sendData = function () {
    	if ($scope.user.login && $scope.user.email && $scope.user.password && $scope.user.login.length<21){
			$http.put('/api/user', $scope.user)
			.success(function(data){
				$scope.error = data["error"];
				if(!data["error"])
					location.href = '/';
				$scope.message = data["message"];
			})
			.error(function (data) {
				console.log(data);
			});
			
		} else {
			if ($scope.user.login<21){console.log("Тест")}
			$scope.message = "Пустые поля или пароль меньше шести символов не допускаются";
		};
	};
}