var app = angular.module('books', []);
app.controller('registration', ['$scope', '$http', function($scope, $http) {
    //$scope.user = {};
    $scope.sendData = function() {
		//console.log($scope.user);
		$http.post('/api/user', $scope.user)
		.success(function(data){
			console.log(data);
			$scope.user = {};
		})
		.error(function (data) {
			console.log(data);
		});
    };
}]);