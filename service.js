import TrackPlayer, { RepeatMode } from 'react-native-track-player'
import { pushToAnalytics } from './src/services/analytics'
import {GetPlayableUrl, BuildTrackSongObject} from './src/utils/player-fn'

const PlayNext = async () => {
  try {
    let index = await TrackPlayer.getCurrentTrack();
    let nextTrack = await TrackPlayer.getTrack(index + 1);
    let PlayLast = false;
    let mode = await TrackPlayer.getRepeatMode()
    // console.log(mode,"mode set from notifi")
    // if(mode===1){
    //   await TrackPlayer.setRepeatMode(RepeatMode.Off)
    // }
    if (nextTrack) {
      if (nextTrack.url == 'http://') {
        // console.log('from notification nextTrack', nextTrack);
        let PlayUrlOfFirstSong = await GetPlayableUrl(
          nextTrack.songInfo.id,
          nextTrack.songInfo.playlistId,
        );
        let obj = BuildTrackSongObject(
          nextTrack.songInfo.id,
          nextTrack.songInfo.showLyrics,
          PlayUrlOfFirstSong.data.url,
          nextTrack.title,
          nextTrack.artist,
          nextTrack.songInfo.number,
          nextTrack.duration,
          nextTrack.songInfo.playlistId,
        );
        pushToAnalytics(`${nextTrack.songInfo.number}_song_play`, {
          title: nextTrack.title,
        });
        // console.log(index, 'from noti');
        let quew2 = await TrackPlayer.getQueue();

        if (quew2.length == index + 2) {
          // console.log(quew2, 'onlast from noti');
          let nextTrack2 = await TrackPlayer.remove(index + 1);
          let nextTrack3 = await TrackPlayer.add(obj);
          PlayLast = true;
        } else {
          // console.log(quew2, 'mean while from noti');
          let nextTrack3 = await TrackPlayer.add(obj, index + 1);
          let nextTrack2 = await TrackPlayer.remove(index + 2);
        }
      }
      await TrackPlayer.skipToNext();
      if (PlayLast) {
        await TrackPlayer.play();
      }
    }
  } catch (err) {
    console.log(err, 'failed to skip song from noti');
  }
};

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-next', () => {
    PlayNext();
  });
  TrackPlayer.addEventListener('remote-previous', () =>
    TrackPlayer.skipToPrevious(),
  );
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
};
