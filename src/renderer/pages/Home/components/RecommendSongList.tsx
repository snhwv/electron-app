import CustomImg from '@components/CustomImg';
import Icon from '@components/Icon';
import SongItem from '@components/SongItem';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
interface RecommendSongListProps {
  songList: any[];
}
const RecommendSongList: React.FC<RecommendSongListProps> = ({ songList }) => {
  return (
    <>
      <Typography variant="h6" component="h6" mr={2}>
        推荐歌曲
      </Typography>
      <List sx={{ width: '100%', height: 316, overflowY: 'auto' }}>
        {songList?.map((item, index) => {
          return (
            <SongItem
              key={index}
              index={index}
              item={item}
              suffixIcons={[
                {
                  icon: 'icon-download',
                },
                {
                  icon: 'icon-heart',
                },
                {
                  icon: 'icon-plus',
                },
              ]}
            ></SongItem>
          );
        })}
      </List>
    </>
  );
};

export default RecommendSongList;
