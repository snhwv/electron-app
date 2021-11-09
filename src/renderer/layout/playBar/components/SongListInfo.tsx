import BlurImg from '@components/BlurImg';
import { Grid } from '@material-ui/core';
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { getSongListInfo } from '@store/features/songListSlice';
import { useSelector } from 'react-redux';
const SongListInfo: React.FC<any> = () => {
  const songListInfo = useSelector(getSongListInfo);
  console.log(songListInfo);
  return (
    <Grid
      container
      style={{
        height: '100%',
        position: 'relative',
      }}
    >
      <Stack
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
        {/* <ListItemAvatar>
          <Avatar alt="Remy Sharp" />
        </ListItemAvatar> */}
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
      {/* <Box component="div">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" />
        </ListItemAvatar>
        <ListItemText
          sx={{
            '& > .MuiTypography-root': {
              fontSize: '14px',
            },
          }}
          primary={<>dsdafasdf</>}
          secondary={<>sadfsad</>}
        />
      </Box> */}
      {/* <Grid item xs></Grid>
      <Grid item xs></Grid>
      <Grid item xs></Grid> */}
    </Grid>
  );
};
export default SongListInfo;
