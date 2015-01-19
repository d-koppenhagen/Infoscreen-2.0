(function(){
    "use strict";
	angular
		.module('wgscreen')
        .controller('webRTCctrl', ['$scope', '$routeParams',
            function($scope, $routeParams) {
                $('#ownVideoContainer').removeClass('hidden');
                $(".close").click(function () {
                    $(this).parent().parent().addClass('hidden');
                });
                initWebRTC();
            }]);
}());
