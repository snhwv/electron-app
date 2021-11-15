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
  const songs = useSelector(getSongList);

  const dispatch = useDispatch();
  const onSongItemClick = (item: any) => {
    dispatch(updateCurrentSong(item));
  };

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
        }}
      >
        <Typography>收藏全部</Typography>
        <Typography>清空列表</Typography>
      </Stack>

      <ListItem alignItems="flex-start" component="div">
        <BlurImg
          url={songListInfo?.creator?.avatarUrl}
          containerStyle={{
            width: '36px',
            height: '36px',
            borderRadius: 2,
            marginRight: '10px',
          }}
        ></BlurImg>
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
      <List
        sx={{
          width: '100%',
          overflowY: 'auto',
          height: 300,
          paddingRight: '10px',
          boxSizing: 'border-box',
        }}
      >
        {songs?.map((item: any, index: number) => {
          return (
            <SongItem
              key={index}
              containerStyle={
                {
                  // height: 40,
                }
              }
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
                  marginRight: '4px',
                  color: '#8f8f8f',
                  flexShrink: 0,
                  flexGrow: 0,
                  fontSize: '0.9rem',
                }}
              >
                {index < 9 && 0}
                {index + 1}
              </Typography>
              <BlurImg
                url={item.al.picUrl}
                containerStyle={{
                  width: 30,
                  height: 30,
                  marginRight: '15px',
                  borderRadius: '0px 10px',
                  flexShrink: 0,
                  flexGrow: 0,
                }}
                blurStyle={{
                  display: 'none',
                }}
              ></BlurImg>
              <ListItemText
                primary={
                  <span style={{ fontSize: '0.9rem' }}>{item.name}</span>
                }
                secondary={
                  <span style={{ fontSize: '0.8rem' }}>
                    {item.ar.map((item: any) => item.name).join()}
                  </span>
                }
              />
            </SongItem>
          );
        })}
      </List>
    </Grid>
  );
};
export default SongListInfo;
