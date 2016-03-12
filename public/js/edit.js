angular
	.module('Books')
	.controller('EditCtrl', ['$scope', '$http', '$window', '$translate', EditCtrl])
	.controller('PasswordCtrl', ['$scope', '$http', '$translate', PasswordCtrl]);

function EditCtrl($scope, $http, $window, $translate){
	$scope.user = $window.userDate;
	$scope.send = function() {
		$scope.error = true;
		if ($scope.user.email){
			$http.post('/api/edit', $scope.user)
			.success(function(data){
				if (data){
					translate('emailError');
				} else {
					translate('changedSuccess');
					$scope.error = false;
				}
			})
			.error(function (data) {
				console.log(data);
			});
		} else {
			translate('emailEmpty');
		}
		function translate(messageKey) {
			$translate('message.'+messageKey).then(function (data) {
				$scope.message = data;
			});
		}

	};
}

function PasswordCtrl($scope, $http, $translate){
	$scope.save = function(){
		$scope.errorpassword = true;
		if ($scope.password && $scope.password.newPassword && $scope.password.newPassword.length > 5){
			if ($scope.password.newPassword == $scope.password.repeat){
				$http.post('/api/password', $scope.password)
				.success(function(data){
					if(!data){
						$scope.password = {};
						translate("changedSuccess");
						$scope.errorpassword = false;
					} else {
						translate("passwordError");
					}
				})
				.error(function(data){
					console.log(data);
				});
			} else {
				translate("passwordMatchError");
			};
		} else {
			translate("registrationError");
		}

		function translate(messageKey){
			$translate('message.'+messageKey).then(function (data) {
				$scope.message = data;
			});
		}
	};
}

