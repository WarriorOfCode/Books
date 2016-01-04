var app = angular.module('booksregistration', []);
app.controller('showAuthors', ['$scope', function($scope){
	var date = new Date();
	$scope.bitch = date;
}]);
app.controller('registrationBook', ['$scope', '$http', function($scope, $http) {
    $scope.sendData = function() {
		$http.post('/api/book', $scope.book)
		.success(function(data){
			$scope.messageBook = data["message"];
			if(!data["error"])
				$scope.book = {};
		})
		.error(function (data) {
			console.log(data);
		});
    };
}]);

app.controller('registrationAuthor', ['$scope', '$http', function($scope, $http) {
	$scope.sendAuthor = function() {
		$http.post('/api/author', $scope.author)
		.success(function(data){
			$scope.messageAuthor = data["message"];
			if(!data["error"])
				$scope.book = {};
		})
		.error(function (data) {
			console.log(data);
		});
    };
}]);