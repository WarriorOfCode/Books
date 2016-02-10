angular
	.module('Books')
	.directive('bookquote', [bookquote]);

function bookquote() {
	return {
		restrict: 'A',
		templateUrl: '/js/directives/bookquote.html'
	}
}