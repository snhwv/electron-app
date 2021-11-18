import CustomImg from '@components/CustomImg';
import Icon from '@components/Icon';
import SongItem from '@components/SongItem';
import { Grid } from '@material-ui/core';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import {
  getSongList,
  getSongListInfo,
  updateCurrentSong,
} from '@store/features/songListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatDuration, reSizeImg } from '@utils/funcs';

import { updatePlaySongList } from '@store/features/songListSlice';
import { FixedSizeList } from 'react-window';
import SongList from '@components/SongList';

const itemIconStyle = {
  fontSize: 16,
  marginRight: '4px',
  color: '#b9b9b9',
};

const SongListInfo: React.FC<any> = () => {
  const songListInfo = useSelector(getSongListInfo);
  const songs = useSelector(getSongList);

  // const dispatch = useDispatch();
  // const onSongItemClick = (item: any) => {
  //   dispatch(updateCurrentSong(item));
  // };

  return (
    <Grid
      style={{
        height: '100%',
        position: 'relative',
        padding: '100px 24px 0px 16px',
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
              fontSize: '14px',
            },
          }}
          primary={<>{songListInfo?.creator?.nickname}</>}
          secondary={
            <span
              style={{
                fontSize: '12px',
              }}
            >
              {songListInfo?.creator?.signature}
            </span>
          }
        />
      </ListItem>

      <Typography
        style={{
          fontSize: '30px',
          padding: '0px 20px',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          color: '#b9b9b9',
          whiteSpace: 'nowrap',
          wordBreak: 'break-all',
        }}
      >
        {songListInfo?.name}
      </Typography>
      <SongList
        height={300}
        songs={songs}
        playListDetail={songListInfo}
        style={{
          paddingRight: '10px',
          boxSizing: 'border-box',
        }}
        songItemProps={{
          suffix: (item: any) => (
            <Typography
              style={{
                color: '#b9b9b9',
              }}
            >
              {formatDuration(item.dt / 1000)}
            </Typography>
          ),
        }}
      />
    </Grid>
  );
};
export default SongListInfo;
