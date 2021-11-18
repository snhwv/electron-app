import CustomImg from '@components/CustomImg';
import SongItem from '@components/SongItem';
import {
  Button,
  Chip,
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
import { FixedSizeList } from 'react-window';
import SongList from '@components/SongList';

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
const tagStyle = {
  border: '1px solid #ff6161',
  padding: '0px 2px',
  borderRadius: '3px',
  fontSize: '0.8rem',
  color: '#ff6161',
  marginLeft: '5px',
};
const noSourceStyle = {
  borderColor: '#ccc',
  color: '#ccc',
};

const SongListContainer: React.FC<SongListProps> = ({
  songs,
  playListDetail,
}) => {
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
      <SongList
        height={370}
        songs={songs}
        playListDetail={playListDetail}
        songItemProps={{
          suffixIcons: [
            {
              icon: 'icon-download',
            },
            {
              icon: 'icon-heart',
            },
          ],
        }}
      />
    </Grid>
  );
};

export default SongListContainer;
