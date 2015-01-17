/* Setting-view controller */
(function(){
    "use strict";	angular
		.module('wgscreen')
        .controller('settingCtrl', ['$scope', '$routeParams',
            function($scope, $routeParams, $http) {
                console.log('open Setting page...');

                // edit stations
                var stationIDs = JSON.parse(localStorage.getItem("lvb_station_ids"));
                $scope.hafasids = stationIDs;
                $scope.deleteStation = function(deleteStationID){
                if (!confirm("Wirklich löschen?")) return;
                    stationIDs.splice( $.inArray(deleteStationID, stationIDs), 1 );
                    localStorage.setItem("lvb_station_ids","["+stationIDs+"]");
                    console.log("deleted station with ID: ", deleteStationID);
                }
                $scope.storeNewHafasID = function(id){
                    if (!id) retrun; //break if id is undefined)
                    console.log("received new hafas id: ", id);
                    stationIDs.push(id);
                    localStorage.setItem("lvb_station_ids","["+stationIDs+"]");
                }

                // change max. station entries
                createUISliders();
                $scope.currentStationValue = $('#selectMaxStationsSlider').val();
                $("#selectMaxStationsSlider").on({
                    slide: function(){
                        writeNewValue(this);
                    },
                    set: function(){
                        writeNewValue(this);
                    },
                    change: function(){
                        writeNewValue(this);
                    }
                });
                function writeNewValue(element){
                    var newValue = $(element).val();
                     $scope.currentStationValue = newValue;
                    localStorage.setItem("max_stations", newValue);
                }

        }]);
}());


function createUISliders() {
    $('#selectMaxStationsSlider').noUiSlider({
        start: 8,
        step: 1,
        behaviour: 'tap',
        connect: 'upper',
        range: {
            'min': 1,
            'max': 20
        }
    });
    $('#selectMaxStationsSlider').val(localStorage.getItem("max_stations"));
}
