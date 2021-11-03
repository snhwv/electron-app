import BlurImg from '@components/BlurImg';
import Icon from '@components/Icon';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

const boxSize = 60;
const boxMargin = 30;
const Singer: React.FC<{ singerList: any[] }> = ({ singerList }) => {
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
        {singerList?.map((item) => {
          return (
            <BlurImg
              url={item.picUrl}
              containerStyle={{
                width: boxSize,
                height: boxSize,
                marginRight: '15px',
                borderRadius: 100,
              }}
            ></BlurImg>
            // <ListItem
            //   key={item.picUrl}
            //   secondaryAction={
            //     <Icon
            //       type="icon-dots-horizontal"
            //       style={{
            //         fontSize: 30,
            //       }}
            //     ></Icon>
            //   }
            // >
            //   <ListItemText
            //     primary={item.name}
            //     secondary={`专辑数：${item.albumSize}`}
            //   />
            // </ListItem>
          );
        })}
      </List>
    </>
  );
};
const SingerItem: React.FC<{ singer: any }> = ({ singer }) => {
  return (
    <div>
      <Grid container>
        <Grid item xs>
          dsfsd
        </Grid>
      </Grid>
    </div>
  );
};
export default Singer;
