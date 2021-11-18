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
import { FixedSizeList, FixedSizeListProps } from 'react-window';

const Row: React.FC<any> = (props) => {
  const { index, style, data, onClick, songItemProps } = props;
  const item = data[index] || {};
  return (
    <SongItem
      key={item?.id}
      index={index}
      item={item}
      onClick={() => onClick(item)}
      suffixIcons={[
        {
          icon: 'icon-download',
        },
        {
          icon: 'icon-heart',
        },
      ]}
      {...songItemProps}
      style={{ ...style, ...songItemProps?.style }}
    ></SongItem>
  );
};
const SongList: React.FC<
  {
    songs: any[];
    playListDetail: any;
    height: string | number;
    songItemProps?: any;
    style?: any;
  } & any
> = ({ songs, playListDetail, height, songItemProps, ...rest }) => {
  const dispatch = useDispatch();
  const onSongItemClick = (item: any) => {
    dispatch(
      updatePlaySongList({
        id: playListDetail?.id,
        playListInfo: playListDetail,
        playSongList: songs.filter((item: any) => item?.privilege.st !== -200),
      })
    );
    dispatch(updateCurrentSong(item));
  };
  return (
    <FixedSizeList
      height={height}
      itemCount={songs?.length || 0}
      itemSize={54}
      width={'100%'}
      itemData={songs}
      {...rest}
    >
      {(props) => (
        <Row
          {...props}
          songItemProps={songItemProps}
          onClick={(item: any) => onSongItemClick(item)}
        ></Row>
      )}
    </FixedSizeList>
  );
};
export default SongList;
