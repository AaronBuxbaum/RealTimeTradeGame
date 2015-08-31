About.controller('AboutCtrl', function ($mdDialog, $templateCache) {
    var ctrl = this;

    ctrl.openAbout = function ($event) {
        $mdDialog.show({
            title: 'About',
            templateUrl: 'about/about-dialog.html',
            ok: 'Close',
            targetEvent: $event,
            closeOutsideToClose: true,
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
                        text: 'I\'m a full-stack Software Engineer II at FactSet Research Systems, specializing in AngularJS. I hold a Bachelors of Science in Computer Science and a Minor in Mathematics from the University of Massachusetts-Amherst.'
                    }
                ];
            }
        });
    };
});