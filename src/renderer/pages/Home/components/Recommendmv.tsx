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
const Recommendmv: React.FC<{ singerList: any[] }> = ({ singerList }) => {
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
        热门歌手
        <span
          style={{
            float: 'right',
          }}
        >
          更多
        </span>
      </Typography>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '15px',
          boxSizing: 'border-box',
        }}
      >
        {singerList?.map((item) => {
          return (
            <BlurImg
              url={item.picUrl}
              containerStyle={{
                width: boxSize,
                height: boxSize,
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
      </div>
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
export default Recommendmv;
