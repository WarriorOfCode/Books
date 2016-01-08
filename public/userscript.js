var app = angular.module('user', []);
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