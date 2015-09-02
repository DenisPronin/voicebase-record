angular.module('voicebaseRecord')
    .controller('uploadCtrl', [
        '$scope',
        '$state',
        '$record',
        'tokensApi',
        'mediaApi',
        function ($scope, $state, $record, tokensApi, mediaApi) {

            $scope.isUpload = true;
            $scope.errorMessage = '';

            $record.getMediaFile().then(function (record) {
                var token = tokensApi.getToken();
                if(token && record) {
/*
                    mediaApi.postMedia(token, record)
                        .then(function (mediaStatus) {
                            $scope.result = JSON.stringify(mediaStatus);
                            alert('file is uploading');
                        }, function (error) {
                            $scope.isUpload = false;
                            $scope.errorMessage = error;
                        });
*/
                }
                else {
                    $scope.isUpload = false;
                    $scope.errorMessage = 'Something going wrong! Please try again.';
                }


            }, function (err) {
                $scope.errorMessage = err;
            });

        }
    ]);