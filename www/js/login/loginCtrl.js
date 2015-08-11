angular.module('voicebaseRecord')
    .controller('loginCtrl', ['$scope', '$state', 'tokensApi', function ($scope, $state, tokensApi) {

        $scope.token = '';

        $scope.signIn = function () {
            tokensApi.setToken($scope.token);
            $state.go("record");
        };

    }]);