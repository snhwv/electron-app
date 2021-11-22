import CustomImg from '@components/CustomImg';
import { Grid } from '@material-ui/core';
import { ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { getSongList, getSongListInfo } from '@store/features/songListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatDuration, reSizeImg } from '@utils/funcs';

import SongList from '@components/SongList';
import TypographyText from '@components/TypographyText';
import { useTheme } from '@mui/material/styles';

const a = 1;
const b = 1;

const itemIconStyle = {
  fontSize: 16,
  marginRight: '4px',
  color: '#b9b9b9',
};
const PlayingList = () => {
  const songListInfo = useSelector(getSongListInfo);
  const songs = useSelector(getSongList);

  // const dispatch = useDispatch();
  // const onSongItemClick = (item: any) => {
  //   dispatch(updateCurrentSong(item));
  // };

  const theme = useTheme();
  return (
    <Grid
      style={{
        height: 'calc(100% - 102px)',
        bottom: 70,
        right: 0,
        position: 'absolute',
        background: '#fff',
        padding: theme.spacing(4, 3, 0, 2),
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          paddingLeft: '20px',
          color: '#706f6f',
        }}
      >
        <Typography>收藏全部</Typography>
        <Typography>清空列表</Typography>
      </Stack>

      <ListItem alignItems="flex-start" component="div">
        <CustomImg
          url={songListInfo?.creator?.avatarUrl}
          imgWidth={36}
          containerStyle={{
            width: '36px',
            height: '36px',
            borderRadius: 2,
            marginRight: '10px',
          }}
        ></CustomImg>
        <ListItemText
          sx={{
            margin: 0,
            '& > .MuiTypography-root': {
              fontSize: '1rem',
            },
          }}
          primary={<>{songListInfo?.creator?.nickname}</>}
          secondary={
            <TypographyText
              style={{
                fontSize: '0.9rem',
              }}
            >
              {songListInfo?.creator?.signature}
            </TypographyText>
          }
        />
      </ListItem>

      <TypographyText
        noWrap
        style={{
          fontSize: '2.4rem',
          padding: theme.spacing(0, 2),
          color: '#b9b9b9',
        }}
      >
        {songListInfo?.name}
      </TypographyText>
      <SongList
        height={490}
        songs={songs}
        playListDetail={songListInfo}
        style={{
          paddingRight: '10px',
          boxSizing: 'border-box',
        }}
        songItemProps={{
          showTag: false,
          suffix: (item: any) => (
            <TypographyText color="text.secondary">
              {formatDuration(item.dt / 1000)}
            </TypographyText>
          ),
        }}
      />
    </Grid>
  );
};
export default PlayingList;
