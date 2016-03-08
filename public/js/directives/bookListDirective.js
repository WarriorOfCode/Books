angular
	.module('Books')
	.directive('bookList', [bookList]);


function bookList () {
	return {
		restrict: 'A',
		scope: {
			list: '=bookList'
		},
		template: '<div ng-hide="list">Loading...</div>' +
					'<div ng-show="list.length" class="books">' +
						'<div ng-repeat="book in list" class="col-sm-3">' +
							'<a ng-href="/book/{{book.id}}">' +
								'<img ng-src="{{book.imageUrl}}">' +
								'<div> {{book.name}} </div>' +
							'</a>' +
						'</div>' +
					'</div>'
	}
}