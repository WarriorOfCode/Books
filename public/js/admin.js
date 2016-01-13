angular
	.module('Books')
	.controller('BookRegisterCtrl', ['$scope', '$http', BookRegisterCtrl])
	.controller('AuthorRegisterCtrl', ['$scope', '$http', AuthorRegisterCtrl]);

function BookRegisterCtrl($scope, $http) {
    $scope.send = function() {
		$http.post('/api/book', $scope.book)
		.success(function(data){
			$scope.messageBook = data["message"];
			if(!data["error"])
				$scope.book = {};
		})
		.error(function (data) {
			console.log(data);
		});
    };
}

function AuthorRegisterCtrl($scope, $http) {
	$scope.save = function() {
		$http.post('/api/author', $scope.author)
		.success(function(data){
			$scope.messageAuthor = data["message"];
			if(!data["error"])
				$scope.book = {};
		})
		.error(function (data) {
			console.log(data);
		});
    };
}