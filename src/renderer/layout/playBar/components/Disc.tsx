import { Grid } from '@material-ui/core';
import disc from '@assets/disc.png';
import needle from '@assets/needle.png';
import classnames from 'classnames';
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
  getPlayCurrentTime,
} from '@store/features/playSongSlice';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import style from '@style/custom/disc.module.scss';

const binarySearch = (
  arr: { time: number }[],
  val: number,
  low: number,
  high: number
): number => {
  if (low > high) return high;

  let mid = Math.floor((low + high) / 2);

  if (arr[mid].time === val) {
    return mid;
  } else if (arr[mid].time > val) {
    return binarySearch(arr, val, low, mid - 1);
  } else {
    return binarySearch(arr, val, mid + 1, high);
  }
};

let isUserScroll = false;
let isAutoScroll = true;
let userScrollTimer: any;
const Lyric: React.FC<any> = ({ onLyricClick }) => {
  const lyric = useSelector(getLyric);
  const currentTime = useSelector(getPlayCurrentTime);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollElRef = useRef<HTMLDivElement>(null);
  let currentTimeIndex = 0;
  if (lyric?.lyric?.length) {
    let showIndex = binarySearch(
      lyric.lyric,
      currentTime * 1000 + 500,
      0,
      lyric.lyric.length - 1 || 0
    );
    currentTimeIndex = showIndex < 0 ? 0 : showIndex;
  }

  const scrollToCurrentLyric = () => {
    const currentEl: any = containerRef.current?.children?.[currentTimeIndex];
    if (currentEl && scrollElRef.current) {
      scrollElRef.current.scrollTo({
        top: currentEl.offsetTop + currentEl.offsetHeight / 2 - 200,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToCurrentLyric();
  }, [currentTimeIndex]);
  useEffect(() => {
    scrollToCurrentLyric();
  }, []);

  const onWheel = (e: any) => {
    // if (isUserScroll) {
    //   if (containerRef.current) {
    //     console.log('clear');
    //     const prevChild = containerRef.current.querySelector('.subActiveLyric');
    //     if (prevChild) {
    //       prevChild.classList.remove('subActiveLyric');
    //     }
    //   }
    //   isUserScroll = false;
    //   console.log('auto scroll');
    // } else {
    //   isAutoScroll = false;
    //   console.log('user scroll');
    //   userScrollTimer && clearTimeout(userScrollTimer);
    //   userScrollTimer = setTimeout(() => {
    //     isAutoScroll = true;
    //     scrollToCurrentLyric();
    //   }, 2000);
    // }
    // if (containerRef.current && scrollElRef.current) {
    //   const { clientHeight, scrollTop } = scrollElRef.current;
    //   const height = clientHeight / 2 + scrollTop;
    //   const children = Array.from(containerRef.current.children);
    //   for (let i = 0; i < children.length; i++) {
    //     const child: any = children[i];
    //     if (
    //       child.offsetTop <= height &&
    //       child.offsetTop + child.clientHeight > height
    //     ) {
    //       const prevChild =
    //         containerRef.current.querySelector('.subActiveLyric');
    //       if (prevChild) {
    //         prevChild.classList.remove('subActiveLyric');
    //       }
    //       console.log('subActiveLyric');
    //       child.classList.add('subActiveLyric');
    //       break;
    //     }
    //   }
    // }
  };
  return (
    <div
      style={{
        background: 'rgb(0 0 0 / 7%)',
        width: '90%',
        overflow: 'auto',
        height: '400px',
        textAlign: 'center',
        padding: '200px 0px',
        boxSizing: 'border-box',
        margin: 'auto',
        position: 'relative',
        marginTop: '50px',
      }}
      onClick={onLyricClick}
      // onScroll={onWheel}
      ref={scrollElRef}
    >
      <div ref={containerRef} style={{ color: '#6c6c6c' }}>
        {lyric?.lyric?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={classnames({
                [style['activeLyric']]: index === currentTimeIndex,
              })}
              style={{
                padding: '16px 0px',
              }}
            >
              <div>{item.lyc}</div>
              <div>{item.tlyc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Pic: React.FC<any> = ({ onPicClick }) => {
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
      onClick={onPicClick}
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

  const [showPic, setShowPic] = useState(true);

  const triggerClick = () => {
    setShowPic(!showPic);
  };
  return (
    <Grid
      style={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography
        style={{
          fontSize: '16px',
          padding: '13px',
          color: '#5c5c5c',
          fontWeight: 'bold',
          marginTop: '20px',
          paddingLeft: '20px',
        }}
      >
        {playSongInfo?.name}
      </Typography>
      {showPic ? (
        <Pic onPicClick={triggerClick} />
      ) : (
        <Lyric onLyricClick={triggerClick} />
      )}
      {showPic && (
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
      )}
    </Grid>
  );
};
export default Disc;
