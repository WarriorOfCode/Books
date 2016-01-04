var app = angular.module('Exit', []);
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