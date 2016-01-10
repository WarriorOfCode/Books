var app = angular.module('setting', []);
app.controller('edit', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.user = $window.userDate;
	$scope.save = function() {
		$http.post('/api/edit', $scope.user)
		.success(function(data){
			$scope.message = data["message"];
		})
		.error(function (data) {
			console.log(data);
		});
	};
}]);