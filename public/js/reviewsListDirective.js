angular
	.module('Books')
	.directive('reviewsList', [reviewsList]);

function reviewsList() {

	function deleteCitation(id){
		console.log(id)
	}
	return {
	restrict: 'A',
	scope: {
		reviews: '=reviewsList',
		id: '=idUser'
	},
	// Этот HTML заменит директиву bookList.
	templateUrl: '/reviewsDirective.html' 
	}
}