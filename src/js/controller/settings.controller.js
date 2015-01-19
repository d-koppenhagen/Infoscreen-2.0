/* Setting-view controller */
(function(){
    "use strict";	angular
		.module('wgscreen')
        .controller('settingCtrl', ['$scope', '$routeParams',
            function($scope, $routeParams, $http) {
                console.log('open Setting page...');

        // change Style
                $scope.toggleMode = function (color){
                    console.log("Toggle Style...");
                    $("body").css("background-color", color);
                    //$("body").css("color", "#ffffff");
                    //$(".list-group-item-heading").css("color", "#ffffff");
                }

                $('#colorpicker .sliders').noUiSlider({
                    start: 127,
                    connect: "lower",
                    orientation: "horizontal",
                    range: {
                        'min': 0,
                        'max': 255
                    },
                    format: wNumb({
                        decimals: 0
                    })
                });
                getInitColors();
                function getInitColors(){
                    var colorVal = $("body").css("background-color");
                    $scope.currentColor = colorVal ;
                    var rgb = /rgb\((\d+), (\d+), (\d+)\)/.exec(colorVal);
                    console.log("current background color: ", $scope.currentColor);
                    $('#red').val(rgb[1]);
                    $('#green').val(rgb[2]);
                    $('#blue').val(rgb[3]);
                    setColor();
                }
                // Bind the color changing function
                // to the slide event.
                $('#colorpicker .sliders').on('slide', setColor);

                function setColor() {
                    // Get the slider values, stick them together.
                    $scope.currentColor = 'rgb(' +
                        $("#red").val() + ',' +
                        $("#green").val() + ',' +
                        $("#blue").val() + ')';

                    // Fill the color box.
                    $(".result").css({
                        background: $scope.currentColor,
                        color: $scope.currentColor
                    });
                }


        // change City
                $scope.changeCity = function (id){
                    console.log("changing City to ID:", id);
                    localStorage.setItem("weather_location", id);
                }

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
                $("#selectMaxStationsSlider").noUiSlider({
                    start: 8,
                    step: 1,
                    behaviour: 'drag',
                    connect: 'upper',
                    range: {
                        'min': 1,
                        'max': 30
                    }
                });
                $("#selectMaxStationsSlider").val(localStorage.getItem("max_stations"));
                $scope.currentStationValue = $('#selectMaxStationsSlider').val();
                $("#selectMaxStationsSlider").on({
                    slide: function(){
                        $scope.currentStationValue = $(this).val();
                        localStorage.setItem("max_stations", $(this).val());
                    },
                    change: function(){
                        $scope.currentStationValue = $(this).val();
                        localStorage.setItem("max_stations", $(this).val());
                    }
                });

        // change max. gb entries
                $("#selectMaxGBEntries").noUiSlider({
                    start: 8,
                    step: 1,
                    behaviour: 'tap',
                    connect: 'upper',
                    range: {
                        'min': 1,
                        'max': 30
                    }
                });
                $("#selectMaxGBEntries").val(localStorage.getItem("max_gb"));
                $scope.currentGBvalue = $('#selectMaxGBEntries').val();
                $("#selectMaxGBEntries").on({
                    slide: function(){
                        $scope.currentGBvalue = $(this).val();
                        localStorage.setItem("max_gb", $(this).val());
                    },
                    change: function(){
                        $scope.currentGBvalue = $(this).val();
                        localStorage.setItem("max_gb", $(this).val());
                    }
                });


        // change max. feed entries
                $("#selectMaxFeedSlider").noUiSlider({
                    start: 10,
                    step: 1,
                    behaviour: 'tap',
                    connect: 'upper',
                    range: {
                        'min': 1,
                        'max': 50
                    }
                });
                $("#selectMaxFeedSlider").val(localStorage.getItem("max_feed"));
                $scope.currentFeedValue = $('#selectMaxFeedSlider').val();
                $("#selectMaxFeedSlider").on({
                    slide: function(){
                        $scope.currentFeedValue = $(this).val();
                        localStorage.setItem("max_feed", $(this).val());
                    },
                    change: function(){
                        $scope.currentFeedValue = $(this).val();
                        localStorage.setItem("max_feed", $(this).val());
                    }
                });



        // edit stations
                var rssFeedList = JSON.parse(localStorage.getItem("rssFeeds"));
                $scope.rssFeeds = rssFeedList;
                $scope.deleteRSSFeed = function(feedID){
                if (!confirm("Wirklich löschen?")) return;
                    rssFeedList.splice( $.inArray(feedID, rssFeedList), 1 );
                    localStorage.setItem("rssFeeds",JSON.stringify(rssFeedList));
                    console.log("deleted station with id: ", feedID);
                }
                $scope.storeNewFeed = function(name, url){
                    if (!url || !name) retrun; //break if name or url is undefined)
                    console.log("received new rss feed id: ", name, url);
                    var rssobj = {
                            "id": generateID(),
                            "title": name,
                            "url": url,
                    }
                    rssFeedList.push(rssobj);
                    localStorage.setItem("rssFeeds",JSON.stringify(rssFeedList));
                }


        }]);
}());
