angular
	.module('Books')
	.controller('ReadCtrl', ['$scope', '$http', '$window', ReadCtrl])
	.controller('RatingCtrl', ['$scope', '$http', RatingCtrl])
	.controller('ListCtrl', ['$scope', '$http', ListCtrl])
	.controller('ReviewCtrl', ['$scope', '$http', '$window', ReviewCtrl])
	.controller('CitatCtrl', ['$scope', '$http', '$window', CitatCtrl]);

function RatingCtrl($scope, $http) {
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
			$http.put('/api/book/'+bookId+'/mark', {rate: rate})
			.success(function(data){
				$scope.oldmark = rate;
				$scope.isReadonly = true;
			})
			.error(function(data){
				console.log(data);
			})
		} else if ($scope.oldmark!=rate){
			$http.post('/api/book/'+bookId+'/mark', {rate: rate})
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
		$http.delete('/api/book/'+bookId+'/mark')
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
		$http.get('/api/book/'+bookId+'/mark')
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

function ReadCtrl($scope, $http, $window) {

	var bookId = location.pathname.replace("/book/", "");

	var readText = "Читал",
		unReadText = "Не читал",
		inProgressTest = "Читаю",
		inFutureText = "Буду читать",
		inProgress = false;

	$http.get('/api/book/user/'+bookId)
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
			$http.delete('/api/book/user/'+bookId)
			.success(successHandler)
			.error(errorHandler);
		} else {
			$http.put('/api/book/user', { bookId: bookId, progress: 0})
			.success(successHandler)
			.error(errorHandler);
		}
	};

	$scope.read = function () {
		if (inProgress) return;
		inProgress = true;

		if ($scope.isPresent) {
			$http.delete('/api/book/user/inPresent/'+bookId)
			.success(function(data){
				$scope.isPresent = !$scope.isPresent;
				inProgress = false;
				updateText();
			})
			.error(errorHandler);
		} else {
			$http.put('/api/book/user', { bookId: bookId, progress: 1})
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
			$http.delete('/api/book/user/inFuture/'+bookId)
			.success(function(data){
				$scope.isFuture = !$scope.isFuture;
				inProgress = false;
				updateText();
			})
			.error(errorHandler);
		} else {
			$http.put('/api/book/user/', { bookId: bookId, progress: 2})
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

function ListCtrl($scope, $http){
	var bookId = location.pathname.replace("/book/", "");

	$http.get('/api/book/lists/'+bookId)
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

function ReviewCtrl($scope, $http, $window){

	var bookId = location.pathname.replace("/book/", "");
	getReviews();
	$scope.login = $window.App.login;

	function getReviews () {
		$http.get('/api/book/'+bookId+'/review')
		.success(function(data){
			if (data.length>0){
				$scope.reviews = data;
				data.forEach(function(data){
					if (data.NickName == $window.App.login){
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
			$http.put('/api/book/'+bookId+'/review', $scope.review)
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
		$http.delete('/api/book/review/'+reviewId)
		.success(function(data){
			$scope.buttonHide = false;
			getReviews();
		})
		.error(function(data){
			console.log(data);
		});
	}
	
}

function CitatCtrl($scope, $http, $window){

	var bookId = location.pathname.replace("/book/", "");
	getCitations();
	$scope.login = $window.App.login;

	function getCitations () {
		$http.get('/api/book/'+bookId+'/citations')
		.success(function(data){
			if (data.length>0){
				$scope.citations = data;
				data.forEach(function(data){
					if (data.NickName == $window.App.login){
						return;
					}
				});
			} else {
				$scope.citations = [];
			}
		})
		.error(function(data){
			console.log(data);
		})
	}

	$scope.send = function(){
		if ($scope.citation != null){
			$http.put('/api/book/'+bookId+'/citation', {text: $scope.citation})
			.success(function(data){
				$scope.checked = !$scope.checked;
				getCitations();
			})
			.error(function(data){
				console.log(data);
			});
		}
	}

	$scope.deleteCitation = function(citationId){
		$http.delete('/api/book/citation/'+citationId)
		.success(function(data){
			getCitations();
		})
		.error(function(data){
			console.log(data);
		});
	}
	
}