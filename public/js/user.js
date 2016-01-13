angular
	.module('Books')
	.controller('FriendCtrl', ['$scope', '$http', FriendCtrl]);
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