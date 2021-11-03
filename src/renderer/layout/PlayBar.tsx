import Icon from '@components/Icon';
import {
  getPlayCurrentTime,
  getPlayDurationTime,
  getPlaySong,
  playCurrentTime,
  playDurationTime,
} from '@store/features/playSongSlice';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
// import PauseRounded from '@mui/icons-material/PauseRounded';
// import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
// import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
// import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
// import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
// import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';

interface PlayBarProps {}

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: '100%',
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  display: 'flex',
  boxSizing: 'border-box',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 60,
  height: 60,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function formatDuration(value: number) {
  const minute = Math.floor(value / 60);
  const secondLeft = value - minute * 60;
  return `${minute}:${
    secondLeft < 9 ? `0${secondLeft.toFixed(0)}` : secondLeft.toFixed(0)
  }`;
}

const MusicPlayerSlider: React.FC<any> = ({ audioRef }) => {
  const duration = useSelector(getPlayDurationTime);
  const position = useSelector(getPlayCurrentTime);
  const onSliderChange = (_: any, value: any) => {
    audioRef.current.currentTime = value;
  };
  return (
    <>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={onSliderChange}
        sx={{
          color: 'rgba(0,0,0,0.87)',
          height: 4,
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&:before': {
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible': {
              boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
            },
            '&.Mui-active': {
              width: 20,
              height: 20,
            },
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: -2,
        }}
      >
        <TinyText>{formatDuration(position)}</TinyText>
        <TinyText>-{formatDuration(duration)}</TinyText>
      </Box>
    </>
  );
};
export default function PlayBar() {
  const palySong = useSelector(getPlaySong);
  const dispatch = useDispatch();

  const audioRef = useRef<any>();

  useEffect(() => {
    // audioRef.current.load();
    // playClick(false);
  }, [palySong?.audioUrl]);

  const theme = useTheme();
  const [paused, setPaused] = React.useState(false);

  const playClick = (paused: boolean) => {
    if (paused) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPaused(paused);
  };
  const onTimeUpdate = (time: any) => {
    dispatch(playCurrentTime(time.target.currentTime));
  };
  const onDurationChange = (time: any) => {
    dispatch(playDurationTime(time.target.duration));
  };

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <CoverImage>
            <img
              alt="can't win - Chilling Sunday"
              src={palySong?.songInfo?.album?.picUrl}
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {palySong?.songInfo?.artist?.map((item: any, index: number) => {
                return <span key={index}> {item.name}</span>;
              })}
            </Typography>
            <Typography noWrap>
              <b>{palySong?.songInfo?.name}</b>
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
              {palySong?.songInfo?.album?.name}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            flex: 1,
            padding: '0px 20px',
            // alignItems: 'center',
            // justifyContent: 'space-between',
            // mt: -2,
            width: 400,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: -1,
            }}
          >
            <IconButton aria-label="previous song">
              <Icon type="icon-skip-previous" />
            </IconButton>
            <IconButton
              aria-label={paused ? 'play' : 'pause'}
              onClick={() => playClick(!paused)}
            >
              {paused ? <Icon type="icon-play" /> : <Icon type="icon-pause" />}
            </IconButton>
            <IconButton aria-label="next song">
              <Icon type="icon-skip-next" />
            </IconButton>
          </Box>
          <MusicPlayerSlider audioRef={audioRef}></MusicPlayerSlider>
        </Box>
        <Box>
          <Icon type="icon-play"></Icon>
        </Box>
        <audio
          onDurationChange={onDurationChange}
          onTimeUpdate={onTimeUpdate}
          ref={audioRef}
          controls={false}
        >
          <source src={palySong?.audioUrl} type="audio/mp3" />
          <source src={palySong?.audioUrl} type="audio/ogg" />
          <embed height="100" width="100" src={palySong?.audioUrl} />
        </audio>
        {/* <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1 }}
          alignItems="center"
        >
          <Icon type="icon-ellipsis" />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={{
              color:
                theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&:before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
            }}
          />
          <Icon type="icon-ellipsis" />
        </Stack> */}
      </Widget>
      {/* <WallPaper /> */}
    </Box>
  );
}
