import CustomImg from '@components/CustomImg';
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
import { useHistory } from 'react-router';

const boxSize = 60;
const boxMargin = 30;
const Singer: React.FC<{ singerList: any[] }> = ({ singerList }) => {
  const history = useHistory();
  const onClick = (singer: any) => {
    history.push(`/singer/${singer?.id}`);
  };
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
            <CustomImg
              key={item.id}
              url={item.picUrl}
              imgWidth={boxSize}
              containerStyle={{
                width: boxSize,
                height: boxSize,
                borderRadius: 100,
              }}
              onClick={() => onClick(item)}
            ></CustomImg>
          );
        })}
      </div>
    </>
  );
};
export default Singer;
