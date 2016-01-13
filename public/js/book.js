angular
	.module('Books')
	.controller('ReadCtrl', ['$scope', '$http', ReadCtrl]);

function ReadCtrl($scope, $http) {
	$scope.confirm = function () {
		var bookId = location.pathname.replace("/book/", "");
		var data = { bookId: bookId };

		$http.post('/api/book/user', data)
		.success(function(data){
			location.reload();
		})
		.error(function (data) {
			console.log(data);
		});
	};
}