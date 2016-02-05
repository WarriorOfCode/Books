angular
	.module('Books')
	.controller('AuthorsCtrl', ['$scope', '$http', AuthorsCtrl])
	.controller('ListCtrl', ['$scope', '$http', ListCtrl]);

function AuthorsCtrl($scope, $http) {
	var search = decodeURIComponent(location.search.replace("?query=", ""));

	searchAuthros();

	function searchAuthros (){
		$http.get('/api/authors/search/'+search)
		.success(function(data){
			$scope.authors = data;
		})
		.error(function(data){
			console.log(data)
		})
	}

}

function ListCtrl($scope, $http){
	var	search = decodeURIComponent(location.search.replace("?query=", ""));
	searchLists();

	function searchLists (){
		$http.get('/api/lists/search/'+search)
		.success(function(data){
			var booksShow = [];
			var lists = [];

			data.reverse().forEach (function (book){
				if (!booksShow[book.id_group]) {
					booksShow[book.id_group] = [];
					lists.push({"Name": book.listName, "id": book.id_group, "members": 0});
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