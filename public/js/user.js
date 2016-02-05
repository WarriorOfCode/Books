angular
	.module('Books')
	.controller('FriendCtrl', ['$scope', '$http', '$window', FriendCtrl])
	.controller('UserBooks', ['$scope', '$http', UserBooks]);

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

function UserBooks($scope, $http){
	var userId = location.pathname.replace("/user/", "");
	$http.get('/api/user/books/'+userId)
	.success(function(data){
		$scope.books = data;
	})
	.error(function(data){
		console.log(data);
	})
}