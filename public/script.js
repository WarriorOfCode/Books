var app = angular.module('books', []);
app.controller('registration', ['$scope', '$http', function($scope, $http) {
    //$scope.user = {};
    $scope.sendData = function() {
		//console.log($scope.user);
		$http.post('/api/user', $scope.user)
		.success(function(data){
			if(data["error"]){
				if (data["emailError"]){
					$scope.emailError = data["message"];
					var test = true;
				}

				else
					$scope.nameError = data["message"];
			}
			else 
				$scope.registrationTrue = data["message"];
			//alert(data.message);
			//$scope.user = {};
		})
		.error(function (data) {
			console.log(data);
		});
    };
}]);