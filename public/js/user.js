angular
	.module('Books')
	.controller('FriendCtrl', ['$scope', '$http', FriendCtrl])
	.controller('UserBooks', ['$scope', '$http', UserBooks]);

function FriendCtrl($scope, $http){
	$scope.follow = function () {
		var userId = location.pathname.replace("/user/", "");
		var data ={userId: userId};
		$http.post('/api/friend', data)
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