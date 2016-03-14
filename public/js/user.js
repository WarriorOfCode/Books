angular
	.module('Books')
	.controller('FriendCtrl', ['$scope', '$window', 'UserService', FriendCtrl])
	.controller('UserBooks', ['$scope', '$window', 'UserService', UserBooks])
	.controller('ReviewCtrl', ['$scope', 'UserService', '$window', ReviewCtrl])
	.controller('CitationCtrl', ['$scope', 'UserService', '$window', CitationCtrl]);

function FriendCtrl($scope, $window, UserService){

	$scope.type = false;
	$scope.costil = false;
	var friendText = "Подписаться",
		unFriendText = "Отписаться",
		inProgress = false;

	var userId = $window.App.pageId;

	UserService.checkFollowing(userId)
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
			UserService.unsubscribe(userId)
			.success(successHandler)
			.error(errorHandler);
		} else {
			UserService.subscribe(userId)
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

	UserService.getFollowers(userId)
	.success(function(data){
		$scope.followers = data;
	})
	.error(function(data){
		console.log(data)
	})

	UserService.getFollowing(userId)
	.success(function(data){
		$scope.followings = data;
	})
	.error(function(data){
		console.log(data)
	})
}

function UserBooks($scope, $window, UserService){
	var userId = $window.App.pageId;
	$scope.login = $window.App.login;
	$scope.id = $window.App.pageId;

	UserService.getUserBooks(userId)
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

function ReviewCtrl($scope, UserService, $window) {
	var userId = $window.App.pageId;
	$scope.id = $window.App.id;
	getReviews();

	function getReviews() {

		UserService.getUserReviews(userId)
		.success(function(data){
			$scope.reviews = data;
		})
		.error(function(data){
			console.log(data)
		});
	}

	$scope.deleteReview = function(reviewId){
		UserService.deleteReview(reviewId)
		.success(function(data){
			$scope.buttonHide = false;
			getReviews();
		})
		.error(function(data){
			console.log(data);
		});
	}
}

function CitationCtrl($scope, UserService, $window) {
	var userId = $window.App.pageId;
	$scope.id = $window.App.id;
	getCitations();

	function getCitations() {
		UserService.getCitations(userId)
		.success(function(data){
			$scope.reviews = data;
		})
		.error(function(data){
			console.log(data);
		});
	}

	$scope.deleteReview = function(citationId){
		UserService.deleteCitation(citationId)
		.success(function(data){
			getCitations();
		})
		.error(function(data){
			console.log(data);
		});
	}
}