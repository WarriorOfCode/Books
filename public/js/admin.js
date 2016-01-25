angular
	.module('Books')
	.controller('BookRegisterCtrl', ['$scope', '$http', BookRegisterCtrl])
	.controller('AuthorRegisterCtrl', ['$scope', '$http', AuthorRegisterCtrl])
	.controller('ChangeBooksCtrl', ['$scope', '$http', '$window', ChangeBooksCtrl]);

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

	$http.get('/api/books')
	.success(function(data){
		$scope.existingBooks = data;
	})
	.error(function (data){
		console.log(data)
	})
	
	$scope.action = function(bookId){
		var deleteConfirm = $window.confirm("Are you sure that you want it?");
		if (deleteConfirm) {
			$http.delete('/api/book/'+ bookId)
			.success(function(data){
				console.log(data)
				updateBook(bookId);
			})
			.error(function (data) {
				console.log(data)
			})
		} 
	}

	function updateBook(bookId){
		for (var i = 0; i < $scope.existingBooks.length; i++) {
				if ($scope.existingBooks[i]["id"] == bookId) {
					$scope.existingBooks.splice(i, 1);
				}
			}
	}
}