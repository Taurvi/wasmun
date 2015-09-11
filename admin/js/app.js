debugVars = {};

debugMode = false;

// Initialize Parse
Parse.initialize('wNpu76vwiBw69drSnb6bvfYnNeYCHxqPugSQfZvx', '3ibIg8GnmKrxkPCrmnm53SLjtED2qkfOEe5U8k0k');

var debugMsg = function(msg) {
    if (debugMode)
        console.log('<<<DEBUG>>> ' + msg);
}

var dataPackage = {};

//  Create Angular App
var ngApp = angular.module('ngApp', ['ngRoute', 'ngCrossfilter']);

ngApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'CtrlDisplay'
        })
});

ngApp.controller('CtrlDisplay', ['$scope', '$location', 'Crossfilter', function($scope, $location, Crossfilter) {
    // Enables a dynamic checkbox list for the various roles.
    $scope.selectedRoles = [
        {
            'name': 'Director General',
            'short': 'dg'
        },
        {
            'name': 'Assistant Director General',
            'short': 'adg'
        },
        {
            'name': 'USG of Public Relations',
            'short': 'pr'
        },
        {
            'name': 'USG of Finances',
            'short': 'f'
        },
        {
            'name': 'USG of Logistics',
            'short': 'l'
        }
    ];

    // Enables a dynamic checkbox list for the various status conditions.
    $scope.selectedStatus = [
        {
            'name': 'Pending Review',
            'short': 'review'
        },
        {
            'name': 'Pending Interview',
            'short': 'interview'
        },
        {
            'name': 'Pending Decision',
            'short': 'decision'
        },
        {
            'name': 'Accepted',
            'short': 'accepted'
        },
        {
            'name': 'Rejected',
            'short': 'rejected'
        }
    ];

    // Gets the data from the database
    $scope.readDatabase = function() {
        var SApplications = Parse.Object.extend('SApplications');

        var queryApplications = new Parse.Query(SApplications);

        var tempArray = [];

        queryApplications.find({
            success: function (results) {
                $scope.applicantList = [];
                results.map(function(applicant) {
                    tempArray.push(applicant.attributes);
                })
                $scope.$apply(function() {
                    debugMsg('apply was run!');
                    $scope.applicantList = tempArray;
                })
            }
        })
    }



}]);


