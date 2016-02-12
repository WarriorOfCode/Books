angular
	.module('Books')
	.controller('AuthorCtrl', ['$scope', '$http', AuthorCtrl]);

function AuthorCtrl($scope, $http) {
	var authorId = location.pathname.replace("/author/", "");
	$http.get('/api/author/'+authorId+'/books')
	.success(function(data){
		$scope.books = data;
	})
	.error(function(data){
		console.log(data);
	})
}