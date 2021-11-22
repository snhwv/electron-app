import CustomImg from '@components/CustomImg';
import Icon from '@components/Icon';
import TypographyText from '@components/TypographyText';
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
const PrivateContent: React.FC<{ contentList: any[] }> = ({ contentList }) => {
  return (
    <>
      <Typography variant="h6" component="h6">
        独家放送
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
        {contentList?.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                width: '32%',
              }}
            >
              <CustomImg
                url={item.picUrl}
                imgWidth={250}
                imgHeight={110}
                containerStyle={{
                  width: '100%',
                  height: '110px',
                  borderRadius: 2,
                }}
              ></CustomImg>

              <TypographyText
                fontSize={'small'}
                color="text.secondary"
                noWrap
                sx={{
                  padding: 0.5,
                  WebkitLineClamp: 2,
                  whiteSpace: 'unset',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {item.name}
              </TypographyText>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default PrivateContent;
