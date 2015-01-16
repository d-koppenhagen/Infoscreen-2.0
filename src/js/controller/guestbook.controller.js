/* Guestbook-view controller */
(function(){
    "use strict";
    angular
		.module('wgscreen')
        .controller('gbCtrl', ['$scope', '$http', '$routeParams',
            function($scope, $http, $routeParams) {
                console.log('open guestbook page...');
                $http.get('php/getGuestbookData.php')
                    .success(insertGBData)
                    .error(function(data, status, headers, config) {
                    console.log("Error by getting data", data, status, headers, config);
                });

                function insertGBData (data) {
                    console.log(data);
                    $scope.gbentries = data;
                    $('#summernote').summernote({
                            height: 150,                // set editor height
                            minHeight: 25,              // set minimum height of editor
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
