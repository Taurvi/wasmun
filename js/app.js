debugVars = {};

$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

    $('.modal').each(function(){
        var src = $(this).find('iframe').attr('src');

        $(this).on('click', function(){

            $(this).find('iframe').attr('src', '');
            $(this).find('iframe').attr('src', src);

        });
    });
});

//  Create Angular App
var ngApp = angular.module('ngApp', ['ngRoute']);

ngApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'CtrlApply'
        })
});

ngApp.controller('CtrlApply', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };

    $scope.experienceObject = {};

    $scope.addExperience = function(year, experience) {
        var id = Math.floor(Math.random()*(1000-0+1)+0)

        while ($scope.experienceObject.hasOwnProperty(id))
            id = Math.floor(Math.random()*(1000-0+1)+0)

        $scope.experienceObject[id] = {
            'id' : id,
            'year' : year,
            'experience' : experience
        };
        $scope.enterYear = "";
        $scope.enterExperience = "";
    }

    $scope.removeExperience = function(id){
        $timeout(function() {
            delete $scope.experienceObject[id];
        });
    }

    $scope.submitForm = function() {
        alert("This form doesn't feel like doing anything!");
    }
}]);