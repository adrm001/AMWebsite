var app = (function () {
    var $AM = [[0, 0], [49, -170], [100, 0], [150, -30], [125, -170], [75, -50], [80, -58], [10, -58]];
    var $primaryDark = window.getComputedStyle(document.getElementById('brand-dark7'), null).color;//'#B2DFDB';
    var $primaryLight = window.getComputedStyle(document.getElementById('brand-light1'), null).color;//'#0094B2';
    var $AMLogo;
    var $navTab = 'home';

    var app = angular.module('main', ['ngSanitize','ngRoute','ngAnimate']);

    //define routes
    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/home', {
                    templateUrl: function(){$navTab = 'home'; return 'partials/about.html';}
                }).
                when('/projects', {
                    templateUrl: function(){$navTab = 'projects'; return 'partials/projects.html';},
                    controller: 'ProjectsCtl'
                }).
                when('/resume', {
                    templateUrl: function(){$navTab = 'resume'; return 'partials/resume.html';},
                    controller: 'ResumeCtl'
                }).
                when('/projects/:projectId',{
                    templateUrl:function($params){$navTab = 'projects'; return 'partials/projects/' + $params.projectId + '.html';}
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }
    ]);

    app.controller('NavCtl',['$scope',
        function ($scope) {
            $scope.tabIs = function(tab){
               return $navTab === tab;
            };
            $scope.select = function(tab){
                $navTab = tab;
            };
        }
    ]);

    app.controller('ViewCtl',['$scope',
        function($scope){
            $scope.$on('$viewContentLoaded',function(){
                window.scrollTo(0,0);
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                if($navTab === 'home') {
                    $AMLogo = app.addLogo('AMLogo');
                    $('#AMLogo').on('click', $AMLogo.FoldUnfold.bind($AMLogo));
                    //$AMLogo.FoldUnfold();
                }
                if($navTab === 'resume') {
                    app.addLogo('AMLogoResume');
                }
                if($navTab === 'projects' && $('#AMLogoPapperLetter').length > 0) {
                    app.addLogo('AMLogoPapperLetter',1,2500);
                }
            })
        }
    ]);

    app.controller('ResumeCtl',['$scope','$http',
        function($scope,$http){
            $http.get('assets/resume.json').success(function(data){
                $scope.sections = data.sections;
                $scope.sections.forEach( function(section){section.collapsed=false;});
            });

            $scope.collapseSection = function (section) {
                section.collapsed = ! section.collapsed;
            };
        }
    ]);

    app.controller('ProjectsCtl',['$scope','$http',
        function($scope,$http){
            $http.get('assets/projectTeasers.json').success(function(data){
                $scope.teasers = data.teasers;
            });
        }
    ]);

    app.controller('BoxCtl',['$scope',
        function ($scope) {
            $scope.images = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
        }
    ]);

    app.controller('FooterCtl',['$scope',
        function($scope){
            $scope.mailTo = function() {
                window.open("mailto:" + "adr.mayorga" + "@" + "gmail.com", "_blank");
            }
        }
    ]);

    app.directive('prism', [function() {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                element.ready(function () {
                    Prism.highlightElement(element[0]);
                });
            }
        }
    }]);

    app.addLogo = function (divID,scale,autoUnfoldDelay) {
        var svgDiv = SVG(divID);
        var points = AM.Math.Vec2d.Array2DToVec($AM);
        var orig = new AM.Math.Vec2d(20, 180);
        return new AM.PaperLetter(svgDiv, points, orig, 15, $primaryLight, $primaryDark, scale,autoUnfoldDelay);
    };

    return app;
})();
