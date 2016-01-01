var app = angular.module('Userlogin', []);
app.controller('login', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.sendData = function() {
		$http.post('/api/login', $scope.user)
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