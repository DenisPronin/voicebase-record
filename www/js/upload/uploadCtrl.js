angular.module('voicebaseRecord')
    .controller('uploadCtrl', [
        '$scope',
        '$state',
        '$interval',
        '$record',
        'tokensApi',
        'mediaApi',
        function ($scope, $state, $interval, $record, tokensApi, mediaApi) {

            $scope.isUpload = true;
            $scope.errorMessage = '';
            var token = tokensApi.getToken();

            var startUpload = function () {
                $record.getMediaFile().then(function (record) {
                    if(token && record) {
                        mediaApi.postMedia(token, record).then(function (mediaStatus) {
                            if(mediaStatus.mediaId) {
                                checkMediaFinish(mediaStatus.mediaId)
                            }
                        }, errorHandler);
                    }
                    else {
                        errorHandler();
                    }

                }, errorHandler);
            };

            var checkMediaFinish = function (mediaId) {
                var checker = $interval(function () {
                    checkMediaHandler(checker, mediaId);
                }, 5000);
            };

            var checkMediaHandler = function (checker, mediaId) {
                if(!token) {
                    $interval.cancel(checker);
                    return false;
                }

                mediaApi.checkMediaFinish(token, mediaId)
                    .then(function (data) {
                        if (data.media && data.media.status === 'finished') {
                            $scope.isUpload = false;
                            console.log(data.media);
                            $interval.cancel(checker);
                        }
                    }, errorHandler);

            };

            var errorHandler = function () {
                $scope.isUpload = false;
                $scope.errorMessage = 'Something going wrong! Please try again.';
            };

            startUpload();
        }
    ]);