var app = angular.module('booksregistration', []);
app.controller('registration', ['$scope', '$http', function($scope, $http) {
    $scope.sendData = function() {
		$http.post('/api/book', $scope.book)
		.success(function(data){
			$scope.message = data["message"];
			if(!data["error"])
				$scope.book = {};
		})
		.error(function (data) {
			console.log(data);
		});
    };
}]);