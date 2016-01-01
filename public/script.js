var app = angular.module('books', []);
app.controller('registration', ['$scope', '$http', function($scope, $http) {
    $scope.sendData = function() {
		$http.post('/api/user', $scope.user)
		.success(function(data){
			if(!data["error"])
				location.href = '/';
			$scope.message = data["message"];
		})
		.error(function (data) {
			console.log(data);
		});
    };
}]);