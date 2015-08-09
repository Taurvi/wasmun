var api_education_key = '2457a68d742f0189540113838a4a6376';
var api_education_address = 'http://api.education.com/service/service.php?f=schoolSearch&key=' + api_education_key + '&sn=sf&v=4&zip=98155&resf=json';

var newData;
$.ajax({
    url: api_education_address,
    dataType: 'json',
    success: function(data) {
        newData = data
    }
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

ngApp.controller('CtrlApply', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };
}]);