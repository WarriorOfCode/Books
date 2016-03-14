angular
	.module('Books')
	.controller('BooksLists', ['$scope', 'ListService', BooksLists]);

function BooksLists($scope, ListService){
	ListService.getListNewBooks()
	.success(function(data){
		$scope.newBooks = data;
	})
	.error(function(data){
		console.log(data)
	});

	ListService.getListRatingBooks()
	.success(function(data){
		$scope.books = data;
	})
	.error(function(data){
		console.log(data)
	});
}