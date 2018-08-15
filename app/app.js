'use strict';

var app = angular.module('myApp', [
    'ui.bootstrap',
    'ngRoute',
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/'});
}]);


//Controller
app.controller('flickrController', function ($scope, $http) {
    $scope.search = function () {
        $http.get("http://localhost:3000/entries/" + $scope.searchTag)
            .then(function (response) {
                $scope.images = response.data;
                $scope.slides = [];
                $scope.split_items = [];
                for (let i = 0; i < response.data.length; i++) {
                    $scope.slides[i] = new Object();
                    $scope.slides[i].image = response.data[i];
                    $scope.slides[i].id = i;
                }
                $scope.split_items = $scope.slides.chunk(3);
            });
    };
    $scope.searchTag = '';
    $scope.search();
    angular.element(document).find('#carousel').hide();
    angular.element(document).find('#grid').show();
    $scope.changeView = function () {
        console.log($scope.viewToggle);
        if ($scope.viewToggle == 0) {
            angular.element(document).find('#carousel').hide();
            angular.element(document).find('#grid').show();
        } else {
            angular.element(document).find('#grid').hide();
            angular.element(document).find('#carousel').show();
        }
    };
});


//JS Object Function
Object.defineProperty(Array.prototype, 'chunk', {
    value: function (chunkSize) {
        var temporal = [];

        for (var i = 0; i < this.length; i += chunkSize) {
            temporal.push(this.slice(i, i + chunkSize));
        }

        return temporal;
    }
});
