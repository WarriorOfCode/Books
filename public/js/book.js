angular
	.module('Books')
	.controller('ReadCtrl', ['$scope', '$http', '$window', ReadCtrl]);

function ReadCtrl($scope, $http, $window) {

	var readText = "Читал",
		unReadText = "Не читал",
		isReaded = $window.App.isReaded,
		inProgress = false;

	updateText(); // called when page loaded and ready

	$scope.action = function () {
		if (inProgress) return;
		inProgress = true;

		var bookId = location.pathname.replace("/book/", "");
		var data = { bookId: bookId };

		if (isReaded) {
			$http.delete('/api/book/user/' + bookId)
			.success(success)
			.error(error);
		} else {
			$http.put('/api/book/user', data)
			.success(success)
			.error(error);
		}
	};

	function updateText()
	{
		$scope.text = isReaded ? unReadText : readText;	
	}

	function success(response)
	{
		isReaded = !isReaded;
		updateText();
		inProgress = false;
	}

	function error(data) {
		console.log(data);
		inProgress = false;
	}

}