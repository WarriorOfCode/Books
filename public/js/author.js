angular
	.module('Books')
	.controller('AuthorCtrl', ['$scope', '$http', '$window', AuthorCtrl]);

function AuthorCtrl($scope, $http, $window) {
	var authorId = $window.App.authorId;
	$scope.birthDate = new Date(Date.parse($window.App.authorDate));
	$http.get('/api/author/'+authorId+'/books')
	.success(function(data){
		$scope.books = data;
	})
	.error(function(data){
		console.log(data);
	})
}