angular.module('voicebaseRecord')
    .directive('voicebaseMediaPlayer', function () {
      return {
        restrict: 'E',
        templateUrl: 'js/voicebase-media-player/voicebase-media-player.tpl.html',
        scope: {
          token: '@',
          mediaId: '@',
          mediaUrl: '@'
        },
        link: function (scope) {

          var initPlayer = function () {
            destroyPlayer();
            jQuery('.vbs-media-player').append('<div id="vbs-console-player-wrap"></div>');

            var $player = jQuery('#vbs-console-player-wrap');
            createJwPlayer();

            $player.voicebase({
              playerId: 'player',
              playerType: 'jwplayer',
              apiUrl: 'https://apis.voicebase.com/v2-beta/',
              mediaID: scope.mediaId,
              token: scope.token,
              apiVersion: '2.0',
              mediaTypeOverride: 'audio',
              localSearch: true,
              localSearchHelperUrl: 'vendor/voicebase-player-lib/js/workers/',
              keywordsGroups: true,
              showPredictionsBlock: true,
              actionFlag: {
                downloadMedia: false,
                downloadTranscript: false
              }
            });
          };

          var createJwPlayer = function () {
            jQuery('#vbs-console-player-wrap').append('<div id="player"></div>');

            jwplayer('player').setup({
              file: scope.mediaUrl,
              primary: 'html5',
              width: '100%',
              height: '264'
            });
          };

          var destroyPlayer = function () {
            jQuery('#vbs-console-player-wrap').voicebase('destroy');
          };

          initPlayer();
        }
      };

    });
