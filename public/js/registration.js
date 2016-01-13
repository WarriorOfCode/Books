angular
	.module('Books')
	.controller('RegistrationCtrl', ['$scope', '$http', RegistrationCtrl]);
function RegistrationCtrl($scope, $http) {
	$scope.sendData = function () {
    	if ($scope.user.nickName && $scope.user.email && $scope.user.password && $scope.user.nickName.length<21){
			$http.post('/api/user', $scope.user)
			.success(function(data){
				if(!data["error"])
					location.href = '/';
				$scope.message = data["message"];
			})
			.error(function (data) {
				console.log(data);
			});
			
		} else {
			if ($scope.user.nickName<21){console.log("Тест")}
			$scope.message = "Пустые поля или пароль меньше шести символов не допускаются";
		};
	};
}