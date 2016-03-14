angular
	.module('Books')
	.controller('ListCtrl', ['$scope', 'ListService', '$window', ListCtrl]);

function ListCtrl ($scope, ListService, $window) {
	function getList() {
		ListService.getLists()
		.success(function (data){
			$scope.lists = data;
		})
		.error(function (data){
			console.log(data)
		})
	};

	function getBook() {
		ListService.getBookInLists()
		.success(function (data){
			var booksShow = [];

			data.reverse().forEach (function (book){
				if (!booksShow[book.id_group]) 
					booksShow[book.id_group] = [];
				if (booksShow[book.id_group].length<4)
					booksShow[book.id_group].push(book);
			});

			$scope.booksShow = booksShow;
		})
		.error(function (data){
			console.log(data);
		})
	};

	getList();
	getBook();
}