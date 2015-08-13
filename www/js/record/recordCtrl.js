angular.module('voicebaseRecord')
    .controller('recordCtrl', ['$scope', '$state', '$record', 'tokensApi', function ($scope, $state, $record, tokensApi) {

        $scope.isRecord = false;

        $scope.toggleRecord = function () {
            $scope.isRecord = !$scope.isRecord;

            if($scope.isRecord) {
                $scope.startRecord();
            }
            else {
                $scope.stopRecord();
            }
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

        $scope.hasRecord = function () {
            return !!$record.getRecord();
        };

        $scope.showPlayBtn = function () {
            return $scope.hasRecord() && !$scope.isRecord;
        };

        $scope.cancel = function () {

        };

    }]);