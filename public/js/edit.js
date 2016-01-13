angular
	.module('Books')
	.controller('EditCtrl', ['$scope', '$http', '$window', EditCtrl])
	.controller('PasswordCtrl', ['$scope', '$http', PasswordCtrl]);

function EditCtrl($scope, $http, $window){
	$scope.user = $window.userDate;
	$scope.send = function() {
		if ($scope.user.email){
			$http.post('/api/edit', $scope.user)
			.success(function(data){
				$scope.message = data["message"];
			})
			.error(function (data) {
				console.log(data);
			});
		} else {
			$scope.message = "поле email не может быть пустым, а люди могут";
		}
	};
}

function PasswordCtrl($scope, $http){
	$scope.save = function(){
		if ($scope.password.new.length > 5){
			if ($scope.password.new == $scope.password.repeat){
				$http.post('/api/password', $scope.password)
				.success(function(data){
					$scope.message = data["message"];
				})
				.error(function(data){
					console.log(data);
				});
				$scope.errorPassword = null;
			} else {
				$scope.errorPassword = "Password doesn't match the confirmation";
			};
		} else {
			$scope.errorNewPassword = "В пароле должно быть как минимум 6 символов"
		}
	};
}

