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
      <Typography variant="h6" component="h6">
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
          boxSizing: 'border-box',
          paddingTop: '15px',
        }}
      >
        {singerList?.map((item) => {
          return (
            <BlurImg
              key={item.id}
              url={item.picUrl}
              containerStyle={{
                width: boxSize,
                height: boxSize,
                borderRadius: 100,
              }}
            ></BlurImg>
          );
        })}
      </div>
    </>
  );
};
export default Singer;
