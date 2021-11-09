import BlurImg from '@components/BlurImg';
import SongItem from '@components/SongItem';
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Icon from '@components/Icon';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import {
  updateCurrentSong,
  updatePlaySongList,
} from '@store/features/songListSlice';
interface SongListProps {
  songs: any[];
  playListDetail: any;
}

const boxSize = 36;

const itemIconStyle = {
  fontSize: 16,
  marginRight: '4px',
  color: '#b9b9b9',
};
const SongList: React.FC<SongListProps> = ({ songs, playListDetail }) => {
  const dispatch = useDispatch();
  const onSongItemClick = (item: any) => {
    dispatch(
      updatePlaySongList({
        id: playListDetail?.id,
        playListInfo: playListDetail,
        playSongList: songs,
      })
    );
    dispatch(updateCurrentSong(item));
  };
  return (
    <Grid
      item
      xs
      style={{
        overflow: 'auto',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        paddingBottom="10px"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            color: '#fff',
            width: 160,
            background: '#e3e3e3a6',
            height: 24,
            borderRadius: 4,
            paddingLeft: '8px',
            '.MuiInput-root:before': {
              display: 'none',
              content: 'unset',
            },
            '.MuiInput-root': {
              color: '#fff',
              fontSize: '0.8rem',
            },
          }}
        >
          <Icon
            type="icon-magnify"
            style={{
              fontSize: 14,
              lineHeight: '24px',
              width: '20px',
              color: '#fff',
            }}
          />
          <TextField variant="standard" fullWidth />
        </Box>
        <Button
          variant="contained"
          sx={{
            height: 24,
            width: '80px',
            borderRadius: '40px',
            padding: 0,
          }}
          endIcon={
            <Icon
              type="icon-play"
              style={{
                fontSize: 14,
                lineHeight: '24px',
                width: '20px',
                color: '#fff',
                marginRight: '-10px',
              }}
            />
          }
        >
          <span
            style={{
              marginRight: '-8px',
            }}
          >
            播放
          </span>
        </Button>
      </Stack>
      <List sx={{ width: '100%', overflowY: 'auto', height: 370 }}>
        {songs?.map((item: any, index: number) => {
          return (
            <SongItem
              key={index}
              listItemProps={{
                onClick: () => onSongItemClick(item),
                secondaryAction: (
                  <Box>
                    <Icon type="icon-download" style={itemIconStyle}></Icon>
                    <Icon type="icon-heart" style={itemIconStyle}></Icon>
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
                  width: boxSize,
                  height: boxSize,
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
      </List>
    </Grid>
  );
};

export default SongList;
