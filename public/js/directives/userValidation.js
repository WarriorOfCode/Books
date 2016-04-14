angular
	.module('Books')
	.directive('userValidation', function userValidation(UserService, $http, $q) {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			ngModel.$asyncValidators.username = function(modelValue, viewValue) {
				return UserService.checkLogin(viewValue).then(
					function(response) {
						if (response.data) {
							return $q.reject("message");
						}
						return true;
					}
				);
			};
		}
	};
});