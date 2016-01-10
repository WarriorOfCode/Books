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

app.controller('friend', ['$scope', '$http', function($scope, $http){
	$scope.follow = function(){
		var userId = location.pathname.replace("/user/", "");
		var data ={userId: userId};
		$http.post('/api/friend', data)
		.success(function(data){
			location.reload();
		})
		.error(function(data){
			console.log(data);
		});
	};
}]);