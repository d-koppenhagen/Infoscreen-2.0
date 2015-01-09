(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
          $scope.items = [
            { name: 'Design', icon: 'fa fa-paint-brush fa-2x' },
          ];
          $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
          };
        });
}());
