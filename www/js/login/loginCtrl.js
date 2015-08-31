angular.module('voicebaseRecord')
    .controller('loginCtrl', [
        '$scope',
        '$state',
        'tokensApi',
        function ($scope, $state, tokensApi) {

            $scope.form = {
                formValid: true,
                token: ''
            };

            $scope.signIn = function () {
                if($scope.form.token) {
                    $scope.form.formValid = true;
                    tokensApi.setToken($scope.form.token);
                    $state.go("record");
                }
                else {
                    $scope.form.formValid = false;
                }
            };

        }
    ]);