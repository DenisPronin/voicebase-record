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
            $scope.uploadedData = null;
            var token = tokensApi.getToken();
            var url;

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
                getMediaUrl(mediaId);
            };

            var getMediaUrl = function (mediaId) {
                mediaApi.getMediaUrl(token, mediaId)
                    .then(function (_url) {
                        url = _url;
                    });
            };

            var checkMediaHandler = function (checker, mediaId) {
                mediaApi.checkMediaFinish(token, mediaId)
                    .then(function (data) {
                        if (data.media && data.media.status === 'finished') {
                            $scope.isUpload = false;
                            console.log(data.media);
                            $scope.uploadedData = {
                                uploadedMedia: data.media,
                                token: token,
                                mediaUrl: url
                            };
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