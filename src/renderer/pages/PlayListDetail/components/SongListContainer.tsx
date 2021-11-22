import { Button, Grid, Stack, TextField } from '@mui/material';
import Icon from '@components/Icon';
import { Box } from '@mui/system';
import SongList from '@components/SongList';

interface SongListProps {
  songs: any[];
  playListDetail: any;
}

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
            paddingLeft: 1,
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
          showImg: false,
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
