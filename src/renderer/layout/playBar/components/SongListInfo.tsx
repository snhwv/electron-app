import BlurImg from '@components/BlurImg';
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
import { formatDuration } from '@utils/funcs';
const itemIconStyle = {
  fontSize: 16,
  marginRight: '4px',
  color: '#b9b9b9',
};
const SongListInfo: React.FC<any> = () => {
  const songListInfo = useSelector(getSongListInfo);
  // const songs = useSelector(getSongList);
  console.log(songListInfo);

  const dispatch = useDispatch();
  const onSongItemClick = (item: any) => {
    dispatch(updateCurrentSong(item));
  };

  return (
    <Grid
      style={{
        height: '100%',
        position: 'relative',
      }}
    >
      {/* <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Typography>收藏全部</Typography>
        <Typography>清空列表</Typography>
      </Stack>

      <ListItem alignItems="flex-start" component="div">
        <BlurImg
          url={songListInfo?.creator?.avatarUrl}
          containerStyle={{
            width: '50px',
            height: '50px',
            borderRadius: 2,
            marginRight: '10px',
          }}
        ></BlurImg>
        <ListItemText
          sx={{
            '& > .MuiTypography-root': {
              fontSize: '14px',
            },
          }}
          primary={<>{songListInfo?.creator?.nickname}</>}
          secondary={<>{songListInfo?.creator?.signature}</>}
        />
      </ListItem>

      <Typography
        style={{
          fontSize: '50px',
          padding: '0px 20px',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          color: '#b9b9b9',
        }}
      >
        {songListInfo?.name}
      </Typography>
      <List sx={{ width: '100%', overflowY: 'auto', height: 370 }}>
        {songs?.map((item: any, index: number) => {
          return (
            <SongItem
              key={index}
              listItemProps={{
                onClick: () => onSongItemClick(item),
                secondaryAction: (
                  <Box>
                    <Typography
                      style={{
                        color: '#b9b9b9',
                      }}
                    >
                      {formatDuration(item.dt / 1000)}
                    </Typography>
                  </Box>
                ),
              }}
            >
              <Typography
                sx={{
                  width: 24,
                  marginRight: '10px',
                  color: '#8f8f8f',
                }}
              >
                {index < 9 && 0}
                {index + 1}
              </Typography>
              <BlurImg
                url={item.al.picUrl}
                containerStyle={{
                  width: 35,
                  height: 35,
                  marginRight: '15px',
                  borderRadius: '0px 10px',
                }}
                blurStyle={{
                  display: 'none',
                }}
              ></BlurImg>
              <ListItemText
                primary={item.name}
                secondary={item.ar.map((item: any) => item.name).join()}
              />
            </SongItem>
          );
        })}
      </List> */}
    </Grid>
  );
};
export default SongListInfo;
