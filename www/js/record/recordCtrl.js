angular.module('voicebaseRecord')
    .controller('recordCtrl', ['$scope', '$state', '$ionicPlatform', 'tokensApi', function ($scope, $state, $ionicPlatform, tokensApi) {

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

        var mediaRec;
        var src = 'vbsRecording.wav';

        $scope.startRecord = function () {
            console.log('startRecord');

            if(mediaRec) {
                mediaRec.release();
            }

            mediaRec = new Media(src, onMediaCallSuccess, onMediaCallError);
            mediaRec.startRecord();
        };

        $scope.stopRecord = function () {
            console.log('stopRecord');
            mediaRec.stopRecord();
        };

        $scope.playRecord = function () {
            if(mediaRec) {
                mediaRec.play();
            }
        };

        function onMediaCallSuccess() {
            console.log("***test: new Media() succeeded ***");
        }
        function onMediaCallError(error) {
            console.log("***test: new Media() failed ***");
        }

    }]);