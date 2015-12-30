var app = angular.module('Userlogin', []);
app.controller('login', ['$scope', '$http', function($scope, $http) {
    $scope.sendData = function() {
		$http.post('/api/login', $scope.user)
		.success(function(data){
			$scope.message = data["message"];
			if(!data["error"])
				$scope.user = {};
		})
		.error(function (data) {
			console.log(data);
		});
    };
}]);