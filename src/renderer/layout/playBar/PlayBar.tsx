import Icon from '@components/Icon';
import {
  getAudioUrl,
  getPlayCurrentTime,
  getPlayDurationTime,
  getPlaySong,
  getPlaySongInfo,
  getVolume,
  playCurrentTime,
  playDurationTime,
  setPlaying,
  updateVolume,
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
import { nextSong, prevSong } from '@store/features/songListSlice';
import PlayPlane from './PlayPlane';
import PlayingList from './PlayingList';
import { formatDuration, reSizeImg } from '@utils/funcs';
import TypographyText from '@components/TypographyText';

const Widget = styled('div')(({ theme }) => ({
  padding: '0px 30px',
  width: '100%',
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  display: 'flex',
  boxSizing: 'border-box',
  zIndex: 1,
  overflow: 'visible',
}));

const CoverImage = styled('div')({
  width: 40,
  height: 40,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: '0px 10px',
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

const VolumeSlider: React.FC<any> = ({ audioRef }) => {
  const volume = useSelector(getVolume);
  const dispatch = useDispatch();
  const onSliderChange = (_: any, value: any) => {
    dispatch(updateVolume(value / 100));
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };
  return (
    <Stack spacing={2} direction="row" sx={{ width: 170 }} alignItems="center">
      <Icon type="icon-volume-high" />
      <Slider
        size="small"
        aria-label="Volume"
        min={0}
        step={1}
        max={100}
        value={volume * 100}
        onChange={onSliderChange}
        sx={{
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-thumb': {
            width: 14,
            height: 14,
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
    </Stack>
  );
};

const MusicPlayerSlider: React.FC<any> = ({ audioRef }) => {
  const duration = useSelector(getPlayDurationTime);
  const position = useSelector(getPlayCurrentTime);
  const onSliderChange = (_: any, value: any) => {
    audioRef.current.currentTime = value;
  };
  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0px 30px 0px 10px',
        }}
      >
        <TinyText>{formatDuration(position)}</TinyText>
        <Slider
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={onSliderChange}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            height: 4,
            margin: '0px 8px',
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
        <TinyText>{formatDuration(duration)}</TinyText>
      </Box>
    </>
  );
};
export default function PlayBar() {
  const audioUrl = useSelector(getAudioUrl);
  const songInfo = useSelector(getPlaySongInfo);
  const dispatch = useDispatch();

  const audioRef = useRef<any>();

  useEffect(() => {
    audioRef.current.load();
    playClick(false);
  }, [audioUrl]);

  const theme = useTheme();
  const [paused, setPaused] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [showSongList, setshowSongList] = React.useState(false);

  const onTrigger = () => {
    setOpen(!open);
  };
  const onTriggerSongList = () => {
    setshowSongList(!showSongList);
  };

  const playNextSongClick = () => {
    dispatch(nextSong(null));
  };
  const playPrevSongClick = () => {
    dispatch(prevSong(null));
  };
  useEffect(() => {
    dispatch(setPlaying(!paused));
  }, [paused]);

  const playClick = (paused: boolean) => {
    if (paused) {
      audioRef.current.pause();
    } else {
      var playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then((_: any) => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch((error: any) => {
            // Auto-play was prevented
            // Show paused UI.
          });
      }
    }
    setPaused(paused);
  };
  const onTimeUpdate = (time: any) => {
    dispatch(playCurrentTime(time.target.currentTime));
  };
  const onEnded = () => {
    dispatch(nextSong(null));
  };
  const onDurationChange = (time: any) => {
    // dispatch(playDurationTime(time.target.duration));
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: open ? 'calc(100vh - 20px)' : '70px',
        transition: 'all 0.5s',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 70,
          position: 'absolute',
          bottom: 0,
          display: 'flex',
          background: '#fff',
          zIndex: 2,
        }}
      >
        <Widget>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              flexBasis: '20%',
              overflow: 'hidden',
            }}
          >
            <CoverImage onClick={onTrigger}>
              <img
                alt="can't win - Chilling Sunday"
                src={reSizeImg(songInfo?.album?.picUrl, 50)}
              />
            </CoverImage>
            <Box sx={{ ml: 1.5, minWidth: 0 }}>
              <TypographyText noWrap>{songInfo?.name}</TypographyText>
              <TypographyText
                color="text.secondary"
                fontSize="smaller"
                fontWeight={500}
                noWrap
              >
                {songInfo?.artist?.map((item: any, index: number) => {
                  return item.name;
                })}
              </TypographyText>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              flexBasis: '60%',
              width: 600,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 120,
                marginRight: '6px',
              }}
            >
              <IconButton
                onClick={playPrevSongClick}
                aria-label="previous song"
              >
                <Icon type="icon-skip-previous" />
              </IconButton>
              <IconButton
                aria-label={paused ? 'play' : 'pause'}
                onClick={() => playClick(!paused)}
              >
                {paused ? (
                  <Icon type="icon-play" />
                ) : (
                  <Icon type="icon-pause" />
                )}
              </IconButton>
              <IconButton onClick={playNextSongClick} aria-label="next song">
                <Icon type="icon-skip-next" />
              </IconButton>
              <IconButton aria-label="next song">
                <Icon type="icon-heart-outline" />
              </IconButton>
            </Box>
            <MusicPlayerSlider audioRef={audioRef}></MusicPlayerSlider>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexBasis: '20%',
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              sx={{ width: 170 }}
              alignItems="center"
            >
              <VolumeSlider audioRef={audioRef} />
              <Icon type="icon-crop-square" />
              <Icon type="icon-menu" onClick={onTriggerSongList} />
            </Stack>
          </Box>
          <audio
            onDurationChange={onDurationChange}
            onTimeUpdate={onTimeUpdate}
            onEnded={onEnded}
            ref={audioRef}
            controls={false}
          >
            <source src={audioUrl} type="audio/mp3" />
            <source src={audioUrl} type="audio/ogg" />
            <embed height="100" width="100" src={audioUrl} />
          </audio>
        </Widget>
      </Box>
      <PlayPlane></PlayPlane>
      <div
        style={{
          display: showSongList ? 'block' : 'none',
        }}
      >
        <PlayingList></PlayingList>
      </div>
    </Box>
  );
}
