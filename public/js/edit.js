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
				$scope.errorEmail = null;
				$scope.error = data["error"];
			})
			.error(function (data) {
				console.log(data);
			});
		} else {
			$scope.errorEmail = "Поле email не может быть пустым, а люди могут";
			$scope.message = null;
		}
	};
}

function PasswordCtrl($scope, $http){
	$scope.save = function(){
		if ($scope.password && $scope.password.new && $scope.password.new.length > 5){
			if ($scope.password.new == $scope.password.repeat){
				$http.post('/api/password', $scope.password)
				.success(function(data){
					$scope.message = data["message"];
					$scope.errorpassword = data["error"];
				})
				.error(function(data){
					console.log(data);
				});
				$scope.errorNewPassword = null;
			} else {
				$scope.errorNewPassword = "Password doesn't match the confirmation";
				$scope.message = null;
			};
		} else {
			$scope.errorNewPassword = "В пароле должно быть как минимум 6 символов";
			$scope.message = null;
		}
	};
}

