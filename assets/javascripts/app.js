(function($, angular) {
'use strict';

angular.module('sam', [])

.controller('PostController', ['$scope', '$http', '$log', function($scope, $http, $log) {

	var self = this;
	var currentIndex = 0;

	$http.get('data.json').success(function(data, status) {
		self.posts = data;
		$scope.post = self.posts[currentIndex];
		$log.info(self.posts);
	})

	self.increaseIndex = function() {
		if(currentIndex === self.posts.length - 1) {
			currentIndex = 0;
		} else {
			currentIndex +=1;
		}
	};

	self.decreaseIndex = function() {
		if(currentIndex === 0) {
			currentIndex = self.posts.length - 1;
		} else {
			currentIndex -= 1;
		}
	};


	self.goNext = function(direction) {
		if(direction === 'next') {
			self.increaseIndex();
		}

		if(direction === 'prev') {
			self.decreaseIndex();
		}

		$scope.post = self.posts[currentIndex];
	};

	$scope.next = function() {
		self.goNext('next');
	};

	$scope.prev = function() {
		self.goNext('prev');
	};

}]);
})(jQuery, angular);