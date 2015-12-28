var app = angular.module('books', []);
app.controller('registration', ['$scope', '$http', function($scope, $http) {
    $scope.sendData = function() {
		$http.post('/api/user', $scope.user)
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