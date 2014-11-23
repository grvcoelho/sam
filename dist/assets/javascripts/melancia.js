(function(angular){
'use strict';

angular.module('melancia', [
  'melancia.directives',
])

})(angular);;
(function(angular){
'use strict';

angular.module('melancia.directives', [
  'melancia.directives.carousel',
  'melancia.directives.tabs'
])

})(angular);;
(function($, _, angular) {
'use strict';

angular.module('melancia.directives.carousel', [])

/**
 * Carousel Controller
 */

.controller('CarouselController', ['$scope', '$timeout', '$interval', '$log', function($scope, $timeout, $interval, $log) {
  /**
   * Stores the controller scope
   */
  var Carousel = this;


  /**
   * Carousel default options
   */
  self.options = {
    slideDuration: 500,
    transitionDuration: 600,
  };

  self.slides = $scope.slides = [];
  self.currentIndex = 0;
  self.isSliding = false;
  self.isPlaying = false;
  self.currentInterval = 0;


  /**
   * Add slide
   *
   * Add the slide and push to the slides array
   *
   * @param <object> slide A jQuery element representing the slide
   */
  self.addSlide = function(slide) {
    self.slides.push(slide);

    if(self.slides.length === 1) {
      self.selectSlide(0);
      self.play('str');
    }

  };


  /**
   * Select slide
   *
   * Select the slide adding the 'active' class
   * 
   * @param <object> slide A jQuery element representing the slide
   */
  self.selectSlide = $scope.selectSlide = function(index) {
    var slide = slides[index];
    slide.addClass('active');
  };


  /**
   * Get next index
   *
   * Get the next index based on the current index. Return the first index when the end has been reached
   * 
   * @return <int> The next index
   */
  self.getNextIndex = function() {
    if(self.currentIndex === self.slides.length - 1) {
      return 0;
    }

    return self.currentIndex + 1;
  };


  /**
   * Get prev index
   *
   * Get the previous index based on the current index. Return the last index when the beginning has been reached
   * 
   * @return <int> The previous index
   */
  self.getPrevIndex = function() {
    if(self.currentIndex === 0) {
      return self.slides.length - 1;
    }
    return self.currentIndex - 1;
  };


  /**
   * Next
   *
   * Slide the carousel to the next slide
   */
  self.next = $scope.next = function() {
    if(self.isSliding === true) return;

    var transitionDuration = self.options.transitionDuration;
    var nextIndex          = self.getNextIndex();
    var $current           = self.slides[currentIndex];
    var $next              = self.slides[nextIndex];

    self.isSliding = true;
    self.currentIndex = nextIndex;

    $next.addClass('next');

    $timeout(function() {
      $current.addClass('left');
      $next.addClass('left');
    });

    $timeout(function() {
      $next.addClass('active');
      $next.removeClass('next left');
      $current.removeClass('active left');
      self.isSliding = false;
    }, transitionDuration);
  };


  /**
   * Prev
   *
   * Slide the carousel to the previous slide
   */
  self.prev = $scope.prev = function() {
    if(self.isSliding === true) return;

    var transitionDuration = self.options.transitionDuration;
    var prevIndex          = self.getPrevIndex();
    var $current           = self.slides[currentIndex];
    var $prev              = self.slides[prevIndex];

    self.isSliding = true;
    self.currentIndex = prevIndex;

    $prev.addClass('prev');

    $timeout(function() {
      $current.addClass('right');
      $prev.addClass('right');
    });

    $timeout(function() {
      $prev.addClass('active');
      $prev.removeClass('prev right');
      $current.removeClass('active right');
      self.isSliding = false;
    }, transitionDuration);
  };

  var restartTimer = function() {
    resetTimer();
    self.currentInterval = $interval(function() {
      if (self.isPlaying) {
        self.next();
      } else {
        self.pause();
      }
    }, self.options.slideDuration);
  }

  var resetTimer = function() {
    if (self.currentInterval) {
      $interval.cancel(self.currentInterval);
      self.currentInterval = null;
    }
  }


  /**
   * Play
   * 
   * Enable the autoplay if the variable 'isPlaying' is true
   */
  self.play = $scope.play = function(str) {
    // if (!self.isPlaying) {
    //   self.isPlaying = true;
    //   restartTimer();
    // }
  };


  /**
   * Pause
   * 
   * Stop the autoplay and set the variable 'isPlaying' to false
   */
  self.pause = $scope.pause = function() {
    if (!$scope.noPause) {
      isPlaying = false;
      resetTimer();
    }
  };

  $scope.isActive = function(index) {
    var slide = self.slides[index];

    return slide.hasClass('active');
  };
}])


/**
 * Carousel Directive
 */
.directive('carousel', ['$timeout', '$interval', '$log', function($timeout, $interval, $log) {

	var template = [
		'<div class="carousel" ng-mouseenter="pause()" ng-mouseleave="play()" ng-swipe-right="prev()" ng-swipe-left="next()">',

      '<div class="carousel-inner" ng-transclude></div>',


  '<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev" ng-click="prev()">', 
    '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>', 
    '<span class="sr-only">Previous</span>', 
  '</a>', 
  '<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next" ng-click="next()">', 
    '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>', 
    '<span class="sr-only">Next</span>', 
  '</a>', 

    '</div>'
  ].join('');

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: template,
    controller: 'CarouselController',
  };
}])



/**
 * Slide Directive
 */
.directive('slide', ['$log', function($log) {

	var template = [
		'<div class="item" ng-transclude></div>'
	].join('');

	return {
		restrict: 'EA',
		require: '^carousel',
		replace: true,
		transclude: true,
		template: template,
		link: function(scope, elem, attrs, CarouselController) {
      var Carousel = CarouselController;
			var $elem = $(elem);

			self.addSlide($elem);
		}
	};
}])


})(jQuery, _, angular);;
(function($, _, angular) {
'use strict';

angular.module('melancia.directives.tabs', [])

.directive('navTabs', ['$log', function($log) {
  return {
    restrict: 'EA',
    
    controller: function($scope) {
      var tabs = this.tabs = [];
      var panes = this.panes = [];

      this.addTab = function(tab) {
        if(tabs.length === 0) {
          $scope.selectTab(tab);
        }

        this.tabs.push(tab);
      };

      this.addPane = function(pane) {
        if(panes.length === 0) {
          $scope.selectPane(pane);
        }

        this.panes.push(pane);
      };


      $scope.selectTab = function(tab) {
        tab.addClass('active');
      };

      $scope.selectPane = function(pane) {
        pane.addClass('active');
      };
      

      this.activate = function(tab) {
        var $currentTab = tab;
        var $tabs = this.tabs;
        var $panes = this.panes;

        var currentIndex = _.indexOf($tabs, $currentTab);

        var $currentPane = $panes[currentIndex];

        _.forEach($tabs, function(tab) {
          tab.removeClass('active');
        });

        _.forEach($panes, function(pane) {
          pane.removeClass('active');
        });

        $currentTab.addClass('active');
        $currentPane.addClass('active');
      };
    }
  };
}])

.directive('navTab', ['$log', function($log) {

  var template = [
    '<li role="presentation">',
      '<a ng-transclude>Home</a>',
    '</li>'
  ].join('');

  return {
    restrict: 'EA',
    require: '^navTabs',
    transclude: true,
    replace: true,
    template: template,

    link: function(scope, elem, attrs, navTabsCtrl) {
      var $elem = $(elem);

      navTabsCtrl.addTab($elem);

      elem.on('click', function() {
        navTabsCtrl.activate($elem);
      });
    }
  };
}])

.directive('navPane', ['$log', function($log) {

  var template = [
    '<div role="tabpanel" class="tab-pane" ng-transclude></div>'
  ].join('');

  return {
    restrict: 'EA',
    require: '^navTabs',
    transclude: true,
    replace: true,
    template: template,

    link: function(scope, elem, attrs, navTabsCtrl) {
      var $elem = $(elem);

      navTabsCtrl.addPane($elem);
    }
  };
}])

})(jQuery, _, angular);