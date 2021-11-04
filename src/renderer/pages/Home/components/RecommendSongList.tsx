import BlurImg from '@components/BlurImg';
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
const boxSize = 36;
const itemIconStyle = {
  fontSize: 16,
  marginRight: '4px',
  color: '#b9b9b9',
};
const RecommendSongList: React.FC<RecommendSongListProps> = ({ songList }) => {
  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          marginLeft: '15px',
        }}
      >
        推荐歌曲
      </Typography>
      <List sx={{ width: '100%', height: 316, overflowY: 'auto' }}>
        {songList?.map((item, index) => {
          return (
            <SongItem
              key={index}
              listItemProps={{
                secondaryAction: (
                  <Box>
                    <Icon type="icon-download" style={itemIconStyle}></Icon>
                    <Icon type="icon-heart" style={itemIconStyle}></Icon>
                    <Icon type="icon-plus" style={itemIconStyle}></Icon>
                  </Box>
                ),
              }}
            >
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
    </>
  );
};

export default RecommendSongList;
