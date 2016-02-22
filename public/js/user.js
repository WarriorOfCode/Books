angular
	.module('Books')
	.controller('FriendCtrl', ['$scope', '$http', '$window', FriendCtrl])
	.controller('UserBooks', ['$scope', '$http', '$window', UserBooks])
	.controller('ReviewCtrl', ['$scope', '$http', '$window', ReviewCtrl])
	.controller('CitationCtrl', ['$scope', '$http', '$window', CitationCtrl]);

function FriendCtrl($scope, $http, $window){

	$scope.type = false;
	$scope.costil = false;
	var friendText = "Подписаться",
		unFriendText = "Отписаться",
		inProgress = false;

	var userId = $window.App.pageId;

	$http.get('/api/checkFollowing/'+userId)
	.success(function(data){
		$scope.isFriend = data != null && data.length > 0;;
		updateText();
	})
	.error(function(data){
		console.log(data)
	});


	$scope.openModal = function(type){
		$scope.costil = !type;
		$scope.type = type;
		$('#followerModal').modal();
	};

	$scope.action = function () {
		if (inProgress) return;
		inProgress = true;
		if ($scope.isFriend) {
			$http.delete('/api/friend/' + userId)
			.success(successHandler)
			.error(errorHandler);
		} else {
			$http.put('/api/friend/', { userId: userId })
			.success(successHandler)
			.error(errorHandler);
		}
	};

	function successHandler(response)
	{
		$scope.isFriend = !$scope.isFriend;
		updateText();
		inProgress = false;
	}

	function errorHandler(data) {
		console.log(data);
		inProgress = false;
	}

	function updateText()
	{
		$scope.text = $scope.isFriend ? unFriendText : friendText;	
	}

	$http.get('/api/user/'+userId+'/follower/')
	.success(function(data){
		$scope.followers = data;
	})
	.error(function(data){
		console.log(data)
	})

	$http.get('/api/user/'+userId+'/following/')
	.success(function(data){
		$scope.followings = data;
	})
	.error(function(data){
		console.log(data)
	})
}

function UserBooks($scope, $http, $window){
	var userId = $window.App.pageId;
	$scope.login = $window.App.login;
	$scope.id = $window.App.pageId;

	$http.get('/api/user/books/'+userId)
	.success(function(data){
		var booksInProgress = [],
			booksInPast = [],
			booksInFuture = [];

		data.forEach(function(data){
			switch (data["progress"]){
				case 0:
					booksInPast.push(data)
					break
				case 1:
					booksInProgress.push(data)
					break
				case 2:
					booksInFuture.push(data)
					break
			}
		})
		$scope.booksInProgress = booksInProgress;
		$scope.booksInFuture = booksInFuture;
		$scope.books = booksInPast;
	})
	.error(function(data){
		console.log(data);
	})
	
}

function ReviewCtrl($scope, $http, $window) {
	var userId = $window.App.pageId;
	$scope.id = $window.App.id;
	getReviews();

	function getReviews() {
		$http.get('/api/user/'+userId+'/reviews')
		.success(function(data){
			$scope.reviews = data;
		})
		.error(function(data){
			console.log(data)
		});
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

function CitationCtrl($scope, $http, $window) {
	var userId = $window.App.pageId;
	$scope.id = $window.App.id;
	getCitations();

	function getCitations() {
		$http.get('/api/user/'+userId+'/citations')
		.success(function(data){
			$scope.reviews = data;
		})
		.error(function(data){
			console.log(data);
		});
	}

	$scope.deleteReview = function(citationId){
		$http.delete('/api/book/citation/'+citationId)
		.success(function(data){
			getCitations();
		})
		.error(function(data){
			console.log(data);
		});
	}
}