debugVars = {};

debugMode = true;

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
    $scope.$ngc;

    // Enables a dynamic checkbox list for the various roles.
    $scope.selectedRoles = [
        {
            'name': 'Director General',
            'short': 'posDG'
        },
        {
            'name': 'Assistant Director General',
            'short': 'posADG'
        },
        {
            'name': 'USG of Public Relations',
            'short': 'posPR'
        },
        {
            'name': 'USG of Finances',
            'short': 'posF'
        },
        {
            'name': 'USG of Logistics',
            'short': 'posL'
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

    $scope.shortPos = ['posDG', 'posADG', 'posPR', 'posF', 'posL'];
    $scope.shortPosSelection =  ['posDG', 'posADG', 'posPR', 'posF', 'posL'];

    $scope.toggleSelection = function($ngc, posName) {
        var idx = $scope.shortPosSelection.indexOf(posName);
        // is currently selected
        if (idx > -1) {
            $scope.shortPosSelection.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.shortPosSelection.push(rankName);
        }
        $scope.$ngc.filterBy('summonerTier', $scope.shortPosSelection, $ngc.filters.inArray('some'));
    };

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
                    // Sets the $scope.applicantLIst equal to the tempArray with the data
                    $scope.applicantList = tempArray;

                    $scope.$ngc = new Crossfilter($scope.applicantList, ['name'])
                    $scope.$ngc.addDimension(['posDG']);
                    $scope.$ngc.addDimension(['posADG']);
                    $scope.$ngc.addDimension(['posL']);
                    $scope.$ngc.addDimension(['posF']);
                    $scope.$ngc.addDimension(['posPR']);


                    // Iterates through each applicant for more specific items
                    $scope.applicantList.map(function(applicant) {
                        applicant.id = $scope.applicantList.indexOf(applicant);
                        var tempPosition = [];
                        if(applicant.posDG)
                            tempPosition.push('Director General');
                        if(applicant.posADG)
                            tempPosition.push('Assistant Director General');
                        if(applicant.posPR)
                            tempPosition.push('USG of Public Relations');
                        if(applicant.posF)
                            tempPosition.push('USG of Finance');
                        if(applicant.posL)
                            tempPosition.push('USG of Logistics');

                        var tempExpStaff = JSON.parse(applicant.experienceStaff);
                        applicant.experienceStaff = tempExpStaff;
                        debugVars.experienceStaff = applicant.experienceStaff;

                        var tempExpGen = JSON.parse(applicant.experienceGeneral);
                        applicant.experienceGeneral = tempExpGen;

                        applicant.positions = tempPosition;
                    })
                    debugVars.applicantList = $scope.applicantList;
                })
            }
        })
    }

    $scope.posFilter = function($ngc, position, filter) {
        if (filter)
            $ngc.filterBy(position, filter);
        else
            $ngc.unfilterBy(position)
    }

    $scope.selectedApplicant = null;

    $scope.selectOption = function(id) {
        $scope.applicantList.map(function(applicant) {
            if (applicant.id == id) {
                $('#' + id).addClass('alert-success');
                $scope.selectedApplicant = $scope.applicantList[id];
            }
            else
                $('#' + applicant.id).removeClass('alert-success');
        })
    }


}]);


