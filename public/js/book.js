angular
	.module('Books')
	.controller('ReadCtrl', ['$scope', 'BookService', '$window', ReadCtrl])
	.controller('RatingCtrl', ['$scope', 'BookService', RatingCtrl])
	.controller('AuthorBookCtrl', ['$scope', 'BookService', AuthorBookCtrl])
	.controller('ListCtrl', ['$scope', 'BookService', ListCtrl])
	.controller('ReviewCtrl', ['$scope', 'BookService', '$window', ReviewCtrl])
	.controller('CitatCtrl', ['$scope', 'BookService', '$window', CitatCtrl])
	.controller('FactsCtrl', ['$scope', 'BookService', '$window', FactsCtrl]);


function ReadCtrl($scope, BookService, $window) {

	var bookId = location.pathname.replace("/book/", "");

	var readText = "Читал",
		unReadText = "Не читал",
		inProgressTest = "Читаю",
		inFutureText = "Буду читать",
		inProgress = false;

	BookService.checkUserReadedByBookId(bookId)
	.success(function(data){
		data.forEach(function(data){
			switch (data["progress"]) {
				case 0:
					$scope.isReaded = true
					break
				case 1:
					$scope.isPresent = true
					break
				case 2:
					$scope.isFuture = true
					break
			}
		})
		updateText();
	})
	.error(function(data){
		console.log(data)
	})

	$scope.action = function () {
		if (inProgress) return;
		inProgress = true;

		if ($scope.isReaded) {
			BookService.deleteReadedMark(bookId)
			.success(successHandler)
			.error(errorHandler);
		} else {
			BookService.addReadMark(bookId, 0)
			.success(successHandler)
			.error(errorHandler);
		}
	};

	$scope.read = function () {
		if (inProgress) return;
		inProgress = true;

		if ($scope.isPresent) {
			BookService.deleteReadMark(bookId)
			.success(function(data){
				$scope.isPresent = !$scope.isPresent;
				inProgress = false;
				updateText();
			})
			.error(errorHandler);
		} else {
			BookService.addReadMark(bookId, 1)
			.success(function(data){
				$scope.isPresent = !$scope.isPresent;
				$scope.isReaded = false;
				$scope.isFuture = false;
				inProgress = false;
				updateText();
			})
			.error(errorHandler);
		}
	};

	$scope.willRead = function () {
		if (inProgress) return;
		inProgress = true;

		if ($scope.isFuture) {
			BookService.deleteWillReadMark(bookId)
			.success(function(data){
				$scope.isFuture = !$scope.isFuture;
				inProgress = false;
				updateText();
			})
			.error(errorHandler);
		} else {
			BookService.addReadMark(bookId, 2)
			.success(function(data){
				$scope.isFuture = !$scope.isFuture;
				$scope.isReaded = false;
				$scope.isPresent = false;
				inProgress = false;
				updateText();
			})
			.error(errorHandler);
		}
	};
	
	function updateText()
	{
		$scope.text = $scope.isFuture ? inFutureText
					: $scope.isPresent ? inProgressTest
					: readText;
	}

		// called when http request ended with success response 
	function successHandler(response)
	{
		$scope.isReaded = !$scope.isReaded;
		$scope.isPresent = false;
		$scope.isFuture = false;
		updateText();
		inProgress = false;
	}

	// called when http request ended with error
	function errorHandler(data) {
		console.log(data);
		inProgress = false;
	}

}

function RatingCtrl($scope, BookService) {
	var bookId = location.pathname.replace("/book/", "");

	getAssessment();

	$scope.rate = 4.5;
	$scope.isReadonly = false;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
	};

	$scope.ratingStates = [
		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
		{stateOff: 'glyphicon-off'}
	];

	$scope.sendMark = function(rate){
		if (!$scope.oldmark){
			BookService.addMark(bookId, rate)
			.success(function(data){
				$scope.oldmark = rate;
				$scope.isReadonly = true;
			})
			.error(function(data){
				console.log(data);
			})
		} else if ($scope.oldmark!=rate){
			BookService.updateMark(bookId, rate)
			.success(function(data){
				$scope.isReadonly = true;
				$scope.oldmark = rate;
			})
			.error(function(data){
				console.log(data)
			})
		}
		
	}

	$scope.deleteMark = function(){
		BookService.deleteMark(bookId)
		.success(function(data){
			$scope.isReadonly = false;
			$scope.rate = 4.5;
			$scope.oldmark = false;
		})
		.error(function(data){
			console.log(data)
		})
	}

	function getAssessment(){
		BookService.getMark(bookId)
		.success(function(data){
			if (data.length>0){
				$scope.rate = data[0]["assessment"];
				$scope.oldmark = data[0]["assessment"];
				$scope.isReadonly = true;
			}
		})
		.error(function(data){
			console.log(data);
		})
	}

}


function AuthorBookCtrl($scope, BookService) {
	var bookId = location.pathname.replace("/book/", "");
	BookService.getAuthorsByBookId(bookId)
	.success(function(data){
		$scope.authors = data;
	})
	.error(function(data){
		console.log(data);
	});
}


function ListCtrl($scope, BookService){
	var bookId = location.pathname.replace("/book/", "");

	BookService.getListsByBookId(bookId)
	.success(function(data){

		var genres =[];
		var lists = [];
		data.forEach(function(data){
			if (data.genre==1)
				genres.push(data);
			else
				lists.push(data)
		});
		$scope.genres = genres;
		$scope.lists = lists;
	})
	.error(function(data){
		console.log(data);
	})
}

function ReviewCtrl($scope, BookService, $window){

	var bookId = location.pathname.replace("/book/", "");
	getReviews();
	$scope.login = $window.App.login;
	$scope.id = $window.App.id;


	function getReviews () {
		BookService.getReviewsByBooksId(bookId)
		.success(function(data){
			if (data.length>0){
				$scope.reviews = data;
				data.forEach(function(data){
					if (data.login == $window.App.login){
						$scope.buttonHide = true;
						return;
					}
				});
			} else {
				$scope.reviews = [];
			}
		})
		.error(function(data){
			console.log(data);
		})
	}

	$scope.send = function(){
		if ($scope.review != null && $scope.review.body){
			BookService.addReview(bookId, $scope.review)
			.success(function(data){
				$scope.checked = !$scope.checked;
				getReviews();
			})
			.error(function(data){
				console.log(data);
			});
		}
	}

	$scope.deleteReview = function(reviewId){
		BookService.deleteReview(reviewId)
		.success(function(data){
			$scope.buttonHide = false;
			getReviews();
		})
		.error(function(data){
			console.log(data);
		});
	}
	
}

function CitatCtrl($scope, BookService, $window){

	var bookId = location.pathname.replace("/book/", "");
	$scope.login = $window.App.login;
	$scope.id = $window.App.id;

	getCitations();

	function getCitations () {
		BookService.getCitationsByBookId(bookId)
		.success(function(data){
			if (data.length>0){
				$scope.reviews = data;
			} else {
				$scope.reviews = [];
			}
		})
		.error(function(data){
			console.log(data);
		})
	}

	$scope.send = function(){
		if ($scope.citation != null){
			BookService.addCitation(bookId, $scope.citation)
			.success(function(data){
				$scope.checked = !$scope.checked;
				getCitations();
			})
			.error(function(data){
				console.log(data);
			});
		}
	}

	$scope.deleteReview = function(citationId){
		BookService.deleteCitation(citationId)
		.success(function(data){
			getCitations();
		})
		.error(function(data){
			console.log(data);
		});
	}
	
}


function FactsCtrl($scope, BookService, $window) {
	var bookId = location.pathname.replace("/book/", "");

	BookService.getFactByBookId(bookId)
	.success(function(data){
		$scope.facts = data;
	})
	.error(function(data){
		console.log(data);
	});
};