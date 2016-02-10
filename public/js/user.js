angular
	.module('Books')
	.controller('FriendCtrl', ['$scope', '$http', '$window', FriendCtrl])
	.controller('UserBooks', ['$scope', '$http', '$window', UserBooks]);
	

function FriendCtrl($scope, $http, $window){

	var friendText = "Подписаться",
		unFriendText = "Отписаться",
		inProgress = false;

	$scope.isFriend = $window.App.isFriend;

	updateText();

	$scope.openModal = function(){
		$('#myModal').modal();
	};

	$scope.action = function () {
		if (inProgress) return;
		inProgress = true;

		var userId = location.pathname.replace("/user/", "");

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
		$scope.text = $scope.isFriend ? friendText : unFriendText;	
	}
}

function UserBooks($scope, $http, $window){
	var userId = location.pathname.replace("/user/", "");
	$scope.login = $window.App.login;
	$scope.id = $window.App.id;

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

	getCitations();
	getReviews();

	function getCitations() {
		$http.get('/api/user/'+userId+'/citations')
		.success(function(data){
			$scope.citations = data;
		})
		.error(function(data){
			console.log(data);
		});
	}

	function getReviews() {
		$http.get('/api/user/'+userId+'/reviews')
		.success(function(data){
			$scope.reviews = data;
		})
		.error(function(data){
			console.log(data)
		});
	}
}