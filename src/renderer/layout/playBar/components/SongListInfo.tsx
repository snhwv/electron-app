import CustomImg from '@components/CustomImg';
import { Grid } from '@material-ui/core';
import { ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { getSongList, getSongListInfo } from '@store/features/songListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatDuration, reSizeImg } from '@utils/funcs';

import SongList from '@components/SongList';
import TypographyText from '@components/TypographyText';
import { useTheme } from '@mui/material/styles';
import { getPlaySongInfo } from '@store/features/playSongSlice';
import React, { useRef, useEffect } from 'react';
import SongPlayTag from '@components/SongPlayTag';
import _ from 'lodash';

const SongItemPrefix = ({ rowData, defaultPrefix }: any) => {
  const songInfo = useSelector(getPlaySongInfo);
  if (songInfo?.id && songInfo.id === rowData?.id) {
    return <SongPlayTag></SongPlayTag>;
  }
  return defaultPrefix;
};
const SongListInfo: React.FC<any> = ({ isShow }) => {
  const songListInfo = useSelector(getSongListInfo);
  const songs = useSelector(getSongList);
  const theme = useTheme();
  const songInfo = useSelector(getPlaySongInfo);

  const listRef = useRef<any>(null);

  useEffect(() => {
    if (listRef.current) {
      let index = _.findIndex(songs, ['id', songInfo?.id]);
      listRef.current.scrollToItem(index, 'center');
    }
  }, [isShow]);

  return (
    <Grid
      style={{
        height: '100%',
        position: 'relative',
        padding: theme.spacing(4, 3, 0, 2),
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
        ref={listRef}
        height={300}
        songs={songs}
        playListDetail={songListInfo}
        style={{
          paddingRight: '10px',
          boxSizing: 'border-box',
        }}
        songItemProps={{
          prefix: SongItemPrefix,
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
export default SongListInfo;
