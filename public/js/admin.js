angular
	.module('Books')
	.factory('AuthorService', ['$http', AuthorService])
	.controller('BookRegisterCtrl', ['$scope', '$http', '$translate', 'AuthorService', BookRegisterCtrl])
	.controller('AuthorRegisterCtrl', ['$scope', '$http', '$translate', AuthorRegisterCtrl])
	.controller('ChangeBooksCtrl', ['$scope', '$http', '$window', '$translate', 'AuthorService',  ChangeBooksCtrl])
	.controller('ChangeAuthorsCtrl', ['$scope', '$http', '$window', '$translate', 'AuthorService', ChangeAuthorsCtrl])
	.controller('OffersCtrl', ['$scope', '$http', OffersCtrl]);

function AuthorService($http) {
	return {
		getAuthors: function(callback) {
			$http.get('/api/authors')
			.success(callback)
			.error(function(data){
				console.log(data);
			})
		}
	}
}

function BookRegisterCtrl($scope, $http, $translate, AuthorService) {
	$scope.send = function() {

		function showEmptyMessage () {
			$translate('message.empty').then(function (data) {
				$scope.messageBook = data;
			});
			$scope.errorBook = true;
		}

		if(!$scope.book){
			showEmptyMessage();
		}
		else if ($scope.book.name
				&& $scope.book.description
				&& $scope.book.birthDate
				&& $scope.book.ISBN !== undefined
				&& $scope.book.author
				&& $scope.book.imageUrl)
				{
				if (0<$scope.book.birthDate && $scope.book.birthDate<2016){
					$http.put('/api/book', $scope.book)
					.success(function(data){
						var messageKey;
						$scope.errorBook = data;
						if(!data["error"]){
							$scope.book = {};
							messageKey = "bookSuccess";
						} else {
							messageKey = "bookError";
						}   
						$translate('message.'+messageKey).then(function (data) {
							$scope.messageBook = data;
						});
					})
					.error(function (data) {
						console.log(data);
					});
				} else {
					$translate('message.date').then(function (data) {
						$scope.messageBook = data;
					});
					$scope.errorBook = true;
				}
			
		} else{
			showEmptyMessage();
		}
	}
	AuthorService.getAuthors(function(data){
		$scope.authors = data;
	});

	
}

function AuthorRegisterCtrl($scope, $http, $translate) {
	$scope.save = function() {
		$http.put('/api/author', $scope.author)
		.success(function(data){
			var messageKey;
			if (!data){
				messageKey = "authorSuccess"
				$scope.author = {};
			} else {
				messageKey ="authorError";
			}
			$scope.errorAuthor = data;
			$translate('message.'+messageKey).then(function (data) {
				$scope.messageAuthor = data;
			});	
		})
		.error(function (data) {
			console.log(data);
		});
	};
}

function ChangeBooksCtrl($scope, $http, $window, $translate, AuthorService) {

	getBook();

	AuthorService.getAuthors(function(data){
		$scope.authors = data;
	});

	function getBook() {
		$http.get('/api/books')
		.success(function(data){
			for (var i=0; i<data.length; i++){
				for (var k=1; k<data.length; k++){
					if (data[i].id==data[k].id && k!=i && data[k].id!=-1 && data[i].id!=-1){
						if (!data[i].dopAuthorName)
							data[i].dopAuthorName = [];
						if (!data[i].dopAuthorLastName)
							data[i].dopAuthorLastName = [];
						data[i].dopAuthorName.push(data[k].authorName);
						data[i].dopAuthorLastName.push(data[k].authorLastname);
						data[k].id = -1;
					}
				}
			}

			data.forEach(function(data0, i, data){
				if (data0.id==-1){
					data[i] = data[data.length-1];
					delete data[data.length-1];
					data.length--;
				}
				if (i == data.length-1)
					$scope.existingBooks = data;
			});

		})
		.error(function (data){
			console.log(data);
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
				console.log(data);
			})
		} 
	}

	$scope.save = function(){

		 if ($scope.book.name
			&& $scope.book.description
			&& $scope.book.birthDate
			&& $scope.book.ISBN !== undefined
			&& $scope.book.author
			&& $scope.book.imageUrl) {
			if (0<$scope.book.birthDate && $scope.book.birthDate<2016){
				$http.post('/api/book/' + $scope.book["id"], $scope.book)
				.success(function (data){
					getBook();
				})
				.error(function (data) {
					console.log(data);
				});
			} else {
				$translate('message.date').then(function (data) {
					$scope.messageChangeBook = data;
				});
			}
		} else{
			$translate('message.empty').then(function (data) {
				$scope.messageChangeBook = data;
			});
			$scope.error = true;
		}
	};

	$scope.openModal = function(book){
		$('#myModal').modal();

		var data = {
			"name": book["name"],
			"description": book["description"],
			"ISBN": book["ISBN"],
			"imageUrl": book["imageUrl"],
			"birthDate": book["birthDate"],
			"id": book["id"]
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

function ChangeAuthorsCtrl ($scope, $http, $window, $translate, AuthorService){
	
	AuthorService.getAuthors(function(data){
		$scope.authors = data;
	});

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
			"name": author["name"],
			"lastname": author["lastName"],
			"patronymic": author["patronymic"],
			"description": author["biography"],
			"age": author["birthDate"],
			"country": author["birthCountry"],
			"link": author["imageUrl"]
		};
		$scope.author = data;
	};

	$scope.save = function(){
		$http.post('/api/author/'+$scope.author["id"], $scope.author)
		.success(function (data){
			AuthorService.getAuthors(function(data){
				$scope.authors = data;
			});
		})
		.error(function (data) {
			console.log(data)
		});
	};


	function updateAuthors(authorId){
		for (var i = 0; i < $scope.authors.length; i++) {
			if ($scope.authors[i]["id"] == authorId) {
				$scope.authors.splice(i, 1);
				break;
			}
		}
	}

}

function OffersCtrl($scope, $http){
	
	$http.get('/api/offers')
	.success(function(data){
		if (data.length>0)
			$scope.offers = data;
	})
	.error(function(data){
		console.log(data);
	})

	$scope.delete = function(id){
		$http.delete('/api/offer/'+id)
		.success(function(data){
			updateOffers(id);
		})
		.error(function(data){
			console.log(data)
		})
	}

	function updateOffers(id){
		for (var i = 0; i < $scope.offers.length; i++) {
			if ($scope.offers[i]["id"] == id) {
				$scope.offers.splice(i, 1);
				break;
			}
		}
	}
}