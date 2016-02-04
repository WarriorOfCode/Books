angular
	.module('Books')
	.controller('AuthorsCtrl', ['$scope', '$http', AuthorsCtrl]);

function AuthorsCtrl ($scope, $http) {
	$http.get('/api/authors')
	.success(function(data){
		$scope.authors = data;
	})
	.error(function(data){
		console.log(data);
	})
}