angular
	.module('Books')
	.controller('FriendCtrl', ['$scope', '$http', FriendCtrl])
	.controller('UserBooks', ['$scope', '$http', UserBooks]);

function FriendCtrl($scope, $http){
	$scope.subscribe = function () {
		var userId = location.pathname.replace("/user/", "");
		var data ={userId: userId};
		$http.put('/api/friend', data)
		.success(function(data){
			location.reload();
		})
		.error(function(data){
			console.log(data);
		});
	};
	$scope.unsubscribe = function () {
		var userId = location.pathname.replace("/user/", "");
		$http.delete('/api/friend/'+userId)
		.success(function(data){
			location.reload();
		})
		.error(function(data){
			console.log(data);
		});
	};
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