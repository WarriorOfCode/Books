angular
	.module('Books')
	.controller('BooksLists', ['$scope', '$http', BooksLists]);

function BooksLists($scope, $http){
	$http.get('/api/lists/newBooks')
	.success(function(data){
		$scope.newBooks = data;
	})
	.error(function(data){
		console.log(data)
	});

	$http.get('/api/lists/rating')
	.success(function(data){
		$scope.books = data;
	})
	.error(function(data){
		console.log(data)
	});
}