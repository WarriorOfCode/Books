angular
	.module('Books')
	.controller('EditCtrl', ['$scope', '$http', '$window', '$translate', EditCtrl])
	.controller('PasswordCtrl', ['$scope', '$http', PasswordCtrl]);

function EditCtrl($scope, $http, $window, $translate){
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
			$translate('message.emailEmpty').then(function (data) {
					$scope.errorEmail = data;
				});
			$scope.message = null;
		}
	};
}

function PasswordCtrl($scope, $http){
	$scope.save = function(){
		if ($scope.password && $scope.password.newPassword && $scope.password.newPassword.length > 5){
			if ($scope.password.newPassword == $scope.password.repeat){
				$http.post('/api/password', $scope.password)
				.success(function(data){
					$scope.message = data["message"];
					$scope.errorpassword = data["error"];
					if(!data["error"])
						$scope.password = {};
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

