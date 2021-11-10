import { Grid } from '@material-ui/core';
import disc from '@assets/disc.png';
import needle from '@assets/needle.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSongList,
  getSongListInfo,
  updateCurrentSong,
} from '@store/features/songListSlice';
import { getPlaying, getPlaySongInfo } from '@store/features/playSongSlice';
import { useRef } from 'react';

const Pic: React.FC<any> = () => {
  const playing = useSelector(getPlaying);
  const playSongInfo = useSelector(getPlaySongInfo);
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        top: '82px',
        backgroundImage: `radial-gradient(circle, #fff 0%, #fff 70%, transparent 70%, transparent 100%)`,
        animation: playing ? 'rotation 6s linear infinite' : undefined,
      }}
    >
      <img
        style={{
          width: '100%',
        }}
        src={disc}
      ></img>
      <img
        style={{
          position: 'absolute',
          width: '64%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          borderRadius: '50%',
        }}
        src={playSongInfo?.album?.picUrl}
      ></img>
    </div>
  );
};

const Disc: React.FC<any> = () => {
  const playing = useSelector(getPlaying);
  const playSongInfo = useSelector(getPlaySongInfo);
  // const songs = useSelector(getSongList);
  console.log(playSongInfo);

  const dispatch = useDispatch();

  const rotation = useRef(0);

  return (
    <Grid
      style={{
        height: '100%',
        position: 'relative',
      }}
    >
      <img
        style={{
          position: 'absolute',
          width: 128,
          top: '-18px',
          left: '40%',
          transform: 'scaleX(-1) rotate(-12deg)',
        }}
        src={needle}
      ></img>
    </Grid>
  );
};
export default Disc;
