import BlurImg from '@components/BlurImg';
import Icon from '@components/Icon';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

const boxSize = 60;
const boxMargin = 30;
const Singer: React.FC<{ singerList: any[] }> = ({ singerList }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360 }}>
      {singerList?.map((item) => {
        return (
          <ListItem secondaryAction={<Icon type="icon-dots-horizontal" style={{
            fontSize: 30
          }}></Icon>}>
            <BlurImg
              url={item.picUrl}
              containerStyle={{
                width: boxSize,
                height: boxSize,
                marginRight: '15px',
                borderRadius: 100,
              }}
            ></BlurImg>
            <ListItemText primary={item.name} secondary={`专辑数：${item.albumSize}`} />
          </ListItem>
        );
      })}
    </List>
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
