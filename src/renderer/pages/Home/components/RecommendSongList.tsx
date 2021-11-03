import BlurImg from '@components/BlurImg';
import Icon from '@components/Icon';
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
interface RecommendSongListProps {
  songList: any[];
}
const boxSize = 50;
const itemIconStyle = {
  fontSize: 20,
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
          // marginBottom: '-40px',
          marginLeft: '10px',
          paddingTop: '10px',
        }}
      >
        推荐歌曲
      </Typography>
      <List sx={{ width: '100%' }}>
        {songList?.map((item, index) => {
          return (
            <ListItem
              key={index}
              disablePadding
              secondaryAction={
                <>
                  <Icon type="icon-download" style={itemIconStyle}></Icon>
                  <Icon type="icon-heart" style={itemIconStyle}></Icon>
                  <Icon type="icon-plus" style={itemIconStyle}></Icon>
                </>
              }
            >
              <ListItemButton>
                <BlurImg
                  url={item.al.picUrl}
                  containerStyle={{
                    width: boxSize,
                    height: boxSize,
                    marginRight: '15px',
                    borderRadius: 2,
                  }}
                  blurStyle={{
                    display: 'none',
                  }}
                ></BlurImg>
                <ListItemText
                  primary={item.name}
                  secondary={item.ar.map((item: any) => item.name).join()}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default RecommendSongList;
