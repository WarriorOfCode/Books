angular
	.module('Books')
	.controller('BookRegisterCtrl', ['$scope', '$http', BookRegisterCtrl])
	.controller('AuthorRegisterCtrl', ['$scope', '$http', AuthorRegisterCtrl])
	.controller('ChangeBooksCtrl', ['$scope', '$http', '$window', ChangeBooksCtrl])
	.controller('ChangeAuthorsCtrl', ['$scope', '$http', '$window', ChangeAuthorsCtrl]);

function BookRegisterCtrl($scope, $http) {
    $scope.send = function() {
		$http.put('/api/book', $scope.book)
		.success(function(data){
			$scope.messageBook = data["message"];
			$scope.errorIsbn = data["error"];
			if(!data["error"])
				$scope.book = {};
		})
		.error(function (data) {
			console.log(data);
		});
    };

   getAuthors();

	function getAuthors() {
		$http.get('/api/authors')
		.success(function(data){
			$scope.authors = data;
		})
		.error(function(data){
			console.log(data)
		})
	}
}

function AuthorRegisterCtrl($scope, $http) {
	$scope.save = function() {
		$http.put('/api/author', $scope.author)
		.success(function(data){
			$scope.messageAuthor = data["message"];
			$scope.errorAuthor = data["error"];
			if(!data["error"])
				$scope.author = {};
		})
		.error(function (data) {
			console.log(data);
		});
    };
}

function ChangeBooksCtrl($scope, $http, $window) {

	getBook();
	getAuthors();

	function getBook() {
		$http.get('/api/books')
		.success(function(data){
			$scope.existingBooks = data;
		})
		.error(function (data){
			console.log(data)
		})
	}

	function getAuthors() {
		$http.get('/api/authors')
		.success(function(data){
			$scope.authors = data;
		})
		.error(function(data){
			console.log(data)
		})
	}

	$scope.action = function(bookId){
		var deleteConfirm = $window.confirm("Are you sure that you want it?");
		if (deleteConfirm) {
			$http.delete('/api/book/'+ bookId)
			.success(function (data){
				updateBook(bookId);
			})
			.error(function (data) {
				console.log(data)
			})
		} 
	}

	$scope.save = function(){
		$http.post('/api/book/'+$scope.book["id"], $scope.book)
		.success(function (data){
			getBook();
		})
		.error(function (data) {
			console.log(data)
		});
	};

	$scope.openModal = function(book){
		$('#myModal').modal();

		for (var key in $scope.authors){
			if ($scope.authors[key].id == book["authorId"]){
				var chooseauthor = $scope.authors[key];
				break;
			}
		}

		var data = {
			"name": book["Name"],
			"description": book["Description"],
			"isbn": book["ISBN"],
			"link": book["image_url"],
			"age": book["Birth_data"],
			"id": book["id"],
			"author": chooseauthor
		};
		$scope.book = data;
	};

	function updateBook(bookId){
		for (var i = 0; i < $scope.existingBooks.length; i++) {
			if ($scope.existingBooks[i]["id"] == bookId) {
				$scope.existingBooks.splice(i, 1);
			}
		}
	}

}

function ChangeAuthorsCtrl ($scope, $http, $window){
	getAuthors();

    function getAuthors() {
		$http.get('/api/authors')
		.success(function(data){
			$scope.authors = data;
		})
		.error(function(data){
			console.log(data)
		})
	}

	$scope.action = function(authorId){
		var deleteConfirm = $window.confirm("Are you sure that you want it?");
		if (deleteConfirm) {
			$http.delete('/api/author/'+ authorId)
			.success(function (data){
				updateAuthors(authorId);
			})
			.error(function (data) {
				console.log(data)
			})
		} 
	}

	$scope.openModal = function(author){
		$('#authorModal').modal();

		var data = {
			"id": author["id"],
			"name": author["Name"],
			"lastname": author["Last_Name"],
			"patronymic": author["patronymic"],
			"description": author["Biography"],
			"age": author["Birth_data"],
			"country": author["Counry_of_birth"],
			"link": author["image_url"]
		};
		$scope.author = data;
	};

	$scope.save = function(){
		$http.post('/api/author/'+$scope.author["id"], $scope.author)
		.success(function (data){
			getAuthors();
		})
		.error(function (data) {
			console.log(data)
		});
	};


	function updateAuthors(authorId){
		for (var i = 0; i < $scope.authors.length; i++) {
			if ($scope.authors[i]["id"] == authorId) {
				$scope.authors.splice(i, 1);
			}
		}
	}


}