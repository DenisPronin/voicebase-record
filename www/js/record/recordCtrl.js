angular.module('voicebaseRecord')
    .controller('recordCtrl', ['$scope', '$state', '$ionicPlatform', '$record', 'tokensApi', function ($scope, $state, $ionicPlatform, $record, tokensApi) {

        $scope.isRecord = false;

        $scope.toggleRecord = function () {
            $ionicPlatform.ready(function () {
                $scope.isRecord = !$scope.isRecord;

                if($scope.isRecord) {
                    $scope.startRecord();
                }
                else {
                    $scope.stopRecord();
                }
            });
        };

        $scope.startRecord = function () {
            $record.start();
        };

        $scope.stopRecord = function () {
            $record.stop();
        };

        $scope.playRecord = function () {
            $record.play();
        };

        function onMediaCallSuccess() {
            console.log("***test: new Media() succeeded ***");
        }
        function onMediaCallError(error) {
            console.log("***test: new Media() failed ***");
        }

    }]);