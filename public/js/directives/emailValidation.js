angular
	.module('Books')
	.directive('emailValidation', function userValidation(UserService, $http, $q) {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			ngModel.$asyncValidators.username = function(modelValue, viewValue) {
				return UserService.checkEmail(viewValue).then(
					function(response) {
						if (response.data) {
							return $q.reject();
						}
						return true;
					}
				);
			};
		}
	};
});