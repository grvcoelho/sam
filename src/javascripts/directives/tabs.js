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