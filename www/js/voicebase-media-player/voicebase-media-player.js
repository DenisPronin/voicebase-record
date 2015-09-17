angular.module('voicebaseRecord')
    .directive('voicebaseMediaPlayer', ['mediaApi', function (mediaApi) {
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
            mediaApi.destroyVoicebasePlayer();
            jQuery('.vbs-media-player').append('<div id="vbs-console-player-wrap"></div>');

            var $player = jQuery('#vbs-console-player-wrap');
            createJPlayer();

            $player.voicebase({
              playerId: 'jplayer',
              playerType: 'jplayer',
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
                downloadTranscript: false,
                print: false
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

          var createJPlayer = function () {
            var player = $('#jplayer-template').html();
            jQuery('#vbs-console-player-wrap').append(player);

            $("#jplayer").jPlayer({
              ready: function () {
                $(this).jPlayer("setMedia", {
                  wav: scope.mediaUrl
                });
              },
              errorAlerts: true,
              swfPath: "lib/jplayer/dist/jplayer/jquery.jplayer.swf",
              supplied: "wav"
            });

          };

          initPlayer();
        }
      };

    }]);
