/**
* @ngdoc controller
* @name About.controller:AboutCtrl
*
* @description
* Controller for the About dialog.
*
* @requires $mdDialog
**/
angular.module('About').controller('AboutCtrl', function ($mdDialog) {
    var ctrl = this;

    /**
    * @ngdoc method
    * @name AboutCtrl#openAbout
    * @methodOf About.controller:AboutCtrl
    *
    * @description
    * A function that opens a dialog with developer information.
    *
    * @param {Object=} $event an Angular click event
    **/
    ctrl.openAbout = function ($event) {
        $mdDialog.show({
            title: 'About',
            templateUrl: 'real-time-trade/about/about-dialog.html',
            ok: 'Close',
            targetEvent: $event,
            clickOutsideToClose: true,
            controller: function ($scope, $mdDialog) {
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }

                $scope.developers = [
                    {
                        name: 'Aaron Buxbaum',
                        title: 'Lead Software Engineer',
                        picture: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/005/01c/0ac/0ece994.jpg',
                        linkedIn: 'https://www.linkedin.com/in/aaronbuxbaum',
                        text: 'I\'m a software engineer working in AngularJS architecture at Raymond James Financial. ' +
                        'I hold a Bachelors of Science in Computer Science and a Minor in Mathematics from the University of Massachusetts-Amherst, ' +
                        'and currently am pursuing my Masters of Science in Computer Science from Georgia Institute of Technology.'
                    }
                ];
            }
        });
    };
});