angular
	.module('Books')
	.controller('AuthorsCtrl', ['$scope', 'AuthorService', AuthorsCtrl])
	.controller('ListCtrl', ['$scope', 'ListService', ListCtrl]);

function AuthorsCtrl($scope, AuthorService) {
	var search = decodeURIComponent(location.search.replace("?query=", ""));

	searchAuthros();

	function searchAuthros (){
		AuthorService.searchAuthor(search)
		.success(function(data){
			$scope.authors = data;
		})
		.error(function(data){
			console.log(data)
		})
	}

}

function ListCtrl($scope, ListService){
	var	search = decodeURIComponent(location.search.replace("?query=", ""));
	searchLists();

	function searchLists (){
		ListService.searchList(search)
		.success(function(data){
			var booksShow = [];
			var lists = [];

			data.reverse().forEach (function (book){
				if (!booksShow[book.id_group]) {
					booksShow[book.id_group] = [];
					lists.push({"name": book.listName, "id": book.id_group, "members": 0});
				}
				if (booksShow[book.id_group].length<4)
					booksShow[book.id_group].push(book);
				lists[lists.length-1]["members"]++
			});

			$scope.booksShow = booksShow;
			$scope.lists = lists;
		})
		.error(function(data){
			console.log(data)
		})
	}
}