/* Settings Controller */
(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('BottomSheet', function($scope, $timeout, $mdBottomSheet) {
          $scope.alert = '';
          $scope.showGridBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
              templateUrl: 'templates/bottom-sheet-grid-template.html',
              controller: 'GridBottomSheetCtrl',
              targetEvent: $event
            }).then(function(clickedItem) {
              $scope.alert = 'Das Design "' +clickedItem.name + '" wurde ausgewählt!';
            });
          };
        });
}());
