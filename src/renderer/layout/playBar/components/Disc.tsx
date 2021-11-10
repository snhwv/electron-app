import { Grid } from '@material-ui/core';
import disc from '@assets/disc.png';
import needle from '@assets/needle.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSongList,
  getSongListInfo,
  updateCurrentSong,
} from '@store/features/songListSlice';
import {
  getPlaying,
  getLyric,
  getPlaySongInfo,
} from '@store/features/playSongSlice';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Typography } from '@mui/material';

const Lyric: React.FC<any> = () => {
  const lyric = useSelector(getLyric);
  console.log(lyric);
  return (
    <div
      style={{
        position: 'absolute',
        background: '#bdadad',
        width: '100%',
        overflow: 'auto',
        height: '500px',
        textAlign: 'center',
        padding: '250px 0px',
        boxSizing: 'border-box',
      }}
    >
      {lyric?.lyric?.map((item: any, index: number) => {
        return (
          <div>
            <div>{item.lyc}</div>
            <div>{lyric?.tlyric?.[index]?.lyc}</div>
          </div>
        );
      })}
    </div>
  );
};

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
        animation: 'rotation 20s linear infinite',
        animationPlayState: playing ? 'running' : 'paused',
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
  const playSongInfo = useSelector(getPlaySongInfo);
  const playing = useSelector(getPlaying);
  const dispatch = useDispatch();
  console.log(playSongInfo);
  return (
    <Grid
      style={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography
        style={
          {
            // fontSize: '50px',
            // padding: '0px 20px',
            // textOverflow: 'ellipsis',
            // overflow: 'hidden',
            // color: '#b9b9b9',
          }
        }
      >
        {`songListInfo?.name`}
      </Typography>
      {/* <Pic /> */}
      <Lyric />
      <img
        style={{
          position: 'absolute',
          width: 165,
          top: '-24px',
          left: '80%',
          transform: `scaleX(-1) rotate(-${playing ? 20 : 34}deg)`,
          transformOrigin: '20px 0px 0',
          transition: 'all 1s',
        }}
        src={needle}
      ></img>
    </Grid>
  );
};
export default Disc;
