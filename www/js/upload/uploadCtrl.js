angular.module('voicebaseRecord')
    .controller('uploadCtrl', [
        '$scope',
        '$state',
        '$interval',
        '$ionicLoading',
        '$record',
        'tokensApi',
        'mediaApi',
        function ($scope, $state, $interval, $ionicLoading, $record, tokensApi, mediaApi) {

            $scope.errorMessage = '';
            $scope.uploadedData = null;
            var token = tokensApi.getToken();
            var url;

            var startUpload = function () {
                showLoading();
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
                            hideLoading();
                            console.log(data.media);
                            $scope.uploadedData = {
                                uploadedMedia: data.media,
                                token: token,
                                mediaUrl: url
                            };
                            $interval.cancel(checker);
                        }
                        else if(data.media && data.media.status === 'failed') {
                            $interval.cancel(checker);
                            errorHandler();
                        }
                    }, errorHandler);
            };

            var errorHandler = function () {
                hideLoading();
                $scope.errorMessage = 'Something going wrong! Please try again.';
            };

            var showLoading = function() {
                $ionicLoading.show({
                    template: 'Loading...'
                });
            };
            var hideLoading = function(){
                $ionicLoading.hide();
            };


            startUpload();
        }
    ]);