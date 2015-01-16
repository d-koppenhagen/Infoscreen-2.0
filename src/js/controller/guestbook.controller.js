/* Guestbook-view controller */
(function(){
    "use strict";
    angular
		.module('wgscreen')
        .controller('gbCtrl', ['$scope', '$http', '$routeParams',
            function($scope, $http, $routeParams) {
                console.log('open guestbook page...');

                refreshGB();
                function refreshGB(){
                    $http.get('php/getGuestbookData.php')
                        .success(insertGBData)
                        .error(function(data, status, headers, config) {
                        console.log("Error by getting data", data, status, headers, config);
                    });
                }
                $scope.sendGBentry = function (){
                    console.log("sending data...");
                    var msg = $('#summernote').code();

                    // Aus den Daten die Anfrage für das PHP-Skript zusammensetzen
                    var dataObj = {
                        "name": $scope.inputName,
                        "message": msg
                    };

                    $http.post('php/gbentry.php', dataObj)
                            .success(callback)
                            .error(function(data, status, headers, config) {
                            console.log("Error by getting guestbook data", data, status, headers, config);
                    });

                    function callback (answer){
                        console.log("Callback: ", answer);
                        var response = answer.replace(/\s/g, "");
                        if (response === "success") { // Nachricht wurde erfolgreich verschickt
                            refreshGB();
                        }
                    }
            };

            console.log("Max:", localStorage.getItem("max_gb"));
            $scope.gblimit = localStorage.getItem("max_gb");
            $scope.moreEntries = function () {
                    console.log("loading more entries...");
                    $scope.gblimit = parseInt($scope.gblimit)+5;
                };




                function insertGBData (data) {
                    console.log(data);
                    $scope.gbentries = data;
                    $('#summernote').summernote({
                            height: 100,                // set editor height
                            minHeight: 20,              // set minimum height of editor
                            //maxHeight: 300,             // set maximum height of editor
                            focus: true,                // set focus to editable area after initializing summernote
                            toolbar: [

                                [
                                    'style',
                                    ['style']
                                ],

                                [
                                    'font',
                                    [
                                        'bold',
                                        'italic',
                                        'underline',
                                        /*
                                        'superscript',
                                        'subscript',
                                        'strikethrough',
                                        'clear'
                                        */
                                    ]
                                ],
                                /*
                                [
                                    'fontname',
                                    [
                                        'fontname'
                                    ]
                                ],
                                */
                                [
                                    'fontsize',
                                    [
                                        'fontsize'
                                    ]
                                ],

                                // Still buggy
                                [
                                    'color',
                                    [
                                        'color'
                                    ]
                                ],
                                /*
                                [
                                    'para',
                                    [
                                        'ul',
                                        'ol',
                                        'paragraph'
                                    ]
                                ],
                                */
                                /*
                                [
                                    'height',
                                    [
                                        'height'
                                    ]
                                ],
                                */
                                /*
                                [
                                    'table',
                                    [
                                        'table'
                                    ]
                                ],
                                */
                                [
                                    'insert',
                                    [
                                        'link',
                                        'picture',
                                        'video',
                                        //'hr'
                                    ]
                                ],
                                [
                                    'view',
                                    [
                                        'fullscreen',
                                        'codeview'
                                    ]
                                ],
                                [
                                    'help',
                                    [
                                        'help'
                                    ]
                                ]
                            ]
                        });
                }
        }]);
}());
