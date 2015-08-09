var api_education_key = '87870540729d04d5dc89a93b8063f9db';
var api_education_address = 'http://api.education.com/service/service.php?f=schoolSearch&key=' + api_education_key + '&sn=sf&v=4&zip=98155&resf=json';

var newData;
$.ajax({
    url: api_education_address,
    dataType: 'jsonp',
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