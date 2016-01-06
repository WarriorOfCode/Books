var app = angular.module('BookSave', []);
app.controller('out', ['$scope', '$http', function($scope, $http) {
    $scope.send = function() {
		$http.get('/api/out')
		.success(function(data){
			location.reload();
		})
		.error(function (data) {
			console.log(data);
		});
    };
}]);

app.controller('Read', ['$scope', '$http', function($scope, $http){
	$scope.confirm = function(){
		var bookId = location.pathname.replace("/book/user/", "");
		var data ={bookId: bookId};
		$http.post('/api/BookSave', data)
		.success(function(data){
			location.reload();
		})
		.error(function (data) {
			console.log(data);
		});
	};
}]);