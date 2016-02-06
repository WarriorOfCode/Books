angular
	.module('Books')
	.controller('ReadCtrl', ['$scope', '$http', '$window', ReadCtrl])
	.controller('ListCtrl', ['$scope', '$http', ListCtrl])
	.controller('ReviewCtrl', ['$scope', '$http', '$window', ReviewCtrl]);

function ReadCtrl($scope, $http, $window) {

	var bookId = location.pathname.replace("/book/", "");

	$scope.rate = 4.5;
	$scope.isReadonly = false;

	$scope.hoveringOver = function(value) {
	$scope.overStar = value;
	};

	$scope.ratingStates = [
		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
		{stateOff: 'glyphicon-off'}
	];

	$scope.sendMark = function(rate){
		if (!$scope.oldmark){
			$http.put('/api/book/'+bookId+'/mark', {rate: rate})
			.success(function(data){
				$scope.oldmark = rate;
				$scope.isReadonly = true;
			})
			.error(function(data){
				console.log(data);
			})
		} else if ($scope.oldmark!=rate){
			$http.post('/api/book/'+bookId+'/mark', {rate: rate})
			.success(function(data){
				$scope.isReadonly = true;
				$scope.oldmark = rate;
			})
			.error(function(data){
				console.log(data)
			})
		}
		
	}

	$scope.deleteMark = function(){
		$http.delete('/api/book/'+bookId+'/mark')
		.success(function(data){
			$scope.isReadonly = false;
			$scope.rate = 4.5;
			$scope.oldmark = false;
		})
		.error(function(data){
			console.log(data)
		})
	}

	var readText = "Читал",
		unReadText = "Не читал",
		inProgress = false;

	$scope.isReaded = $window.App.isReaded;

	updateText(); // called when page loaded and ready
	getAssessment();

	$scope.action = function () {
		if (inProgress) return;
		inProgress = true;

		if ($scope.isReaded) {
			$http.delete('/api/book/user/'+bookId)
			.success(successHandler)
			.error(errorHandler);
		} else {
			$http.put('/api/book/user', { bookId: bookId })
			.success(successHandler)
			.error(errorHandler);
		}
	};

	function updateText()
	{
		$scope.text = $scope.isReaded ? unReadText : readText;	
	}

	function getAssessment(){
		$http.get('/api/book/'+bookId+'/mark')
		.success(function(data){
			if (data.length>0){
				$scope.rate = data[0]["assessment"];
				$scope.oldmark = data[0]["assessment"];
				$scope.isReadonly = true;
			}
		})
		.error(function(data){
			console.log(data);
		})
	}

	// called when http request ended with success response 
	function successHandler(response)
	{
		$scope.isReaded = !$scope.isReaded;
		updateText();
		inProgress = false;
	}

	// called when http request ended with error
	function errorHandler(data) {
		console.log(data);
		inProgress = false;
	}

}

function ListCtrl($scope, $http){
	var bookId = location.pathname.replace("/book/", "");

	$http.get('/api/book/lists/'+bookId)
	.success(function(data){

		var genres =[];
		var lists = [];
		data.forEach(function(data){
			if (data.genre==1)
				genres.push(data);
			else
				lists.push(data)
		});
		$scope.genres = genres;
		$scope.lists = lists;
	})
	.error(function(data){
		console.log(data);
	})
}

function ReviewCtrl($scope, $http, $window){

	var bookId = location.pathname.replace("/book/", "");
	getReviews();

	function getReviews () {
		$http.get('/api/book/'+bookId+'/review')
		.success(function(data){
			if (data.length>0){
				$scope.reviews = data;
				data.forEach(function(data){
					if (data.NickName == $window.App.login){
						$scope.buttonHide = true;
						return;
					}
				});
			}
		})
		.error(function(data){
			console.log(data);
		})
	}

	$scope.send = function(){
		if ($scope.review != null && $scope.review.body){
			$http.put('/api/book/'+bookId+'/review', $scope.review)
			.success(function(data){
				$scope.checked = !$scope.checked;
				getReviews();
			})
			.error(function(data){
				console.log(data);
			})
		}
	}
	
}