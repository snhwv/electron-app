import CustomImg from '@components/CustomImg';
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
import { FixedSizeList } from 'react-window';

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

const Row: React.FC<any> = (props) => {
  const { index, style, data, onClick } = props;
  const item = data[index] || {};
  return (
    <SongItem
      key={index}
      listItemProps={{
        onClick: () => onClick(item),
        style,
      }}
    >
      <Typography
        sx={{
          width: 24,
          marginRight: '10px',
          color: '#8f8f8f',
          flexShrink: 0,
          flexGrow: 0,
        }}
      >
        {index < 9 && 0}
        {index + 1}
      </Typography>
      <CustomImg
        url={item.al.picUrl}
        imgWidth={boxSize}
        containerStyle={{
          width: boxSize,
          height: boxSize,
          marginRight: '15px',
          borderRadius: '0px 10px',
          flexShrink: 0,
          flexGrow: 0,
        }}
        blurStyle={{
          display: 'none',
        }}
      ></CustomImg>
      <ListItemText
        primary={
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              paddingRight: '10px',
            }}
          >
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: item?.privilege.st === -200 ? '#ccc' : 'unset',
              }}
            >
              {item.name}
            </span>
            {item?.privilege.st !== -200 ? (
              <>
                {item?.privilege.fee === 1 && <span style={tagStyle}>vip</span>}
                {item?.privilege.dl === 999000 && (
                  <span style={tagStyle}>sq</span>
                )}
                {item?.mv ? <span style={tagStyle}>mv</span> : null}
              </>
            ) : null}
            {item?.privilege.st === -200 && (
              <span style={{ ...tagStyle, ...noSourceStyle }}>无音源</span>
            )}
          </div>
        }
        secondary={item.ar.map((item: any) => item.name).join()}
      />
      <Box>
        <Icon type="icon-download" style={itemIconStyle}></Icon>
        <Icon type="icon-heart" style={itemIconStyle}></Icon>
      </Box>
    </SongItem>
  );
};

const SongList: React.FC<SongListProps> = ({ songs, playListDetail }) => {
  const dispatch = useDispatch();
  const onSongItemClick = (item: any) => {
    dispatch(
      updatePlaySongList({
        id: playListDetail?.id,
        playListInfo: playListDetail,
        playSongList: songs.filter((item) => item?.privilege.st !== -200),
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
      <FixedSizeList
        height={370}
        itemCount={songs?.length || 0}
        itemSize={54}
        width={'100%'}
        itemData={songs}
      >
        {(props) => (
          <Row {...props} onClick={(item: any) => onSongItemClick(item)}></Row>
        )}
      </FixedSizeList>
    </Grid>
  );
};

export default SongList;
