import BlurImg from '@components/BlurImg';
import Icon from '@components/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import style from '@style/custom/recommend.module.scss';
SwiperCore.use([Autoplay, EffectFade, Navigation]);

const boxSize = 60;
const Recommendmv: React.FC<{ mv: any[] }> = ({ mv }) => {
  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          marginBottom: '-40px',
          marginLeft: '10px',
          paddingTop: '10px',
        }}
      >
        推荐MV
      </Typography>

      <Swiper
        pagination={{
          clickable: true,
        }}
        spaceBetween={3}
        navigation={true}
        className={style['recommendmvSwipper']}
        style={{ height: '200px', width: '400px', paddingTop: '50px' }}
      >
        {mv?.map((item, index) => {
          return (
            <SwiperSlide
              style={{ height: '100%', position: 'relative' }}
              key={index}
              className={'swiperItem'}
            >
              <BlurImg
                key={item.picUrl}
                url={item.picUrl}
                containerStyle={{
                  width: '100%',
                  height: '100%',
                }}
                blurStyle={{
                  display: 'none',
                }}
                className={'recommendItem'}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '60%',
                    left: '10px',
                    background: '#2c2c2cc7',
                    color: '#fff',
                    padding: '10px',
                    boxSizing: 'border-box',
                    fontSize: '14px',
                    maxWidth: '80%',
                  }}
                >
                  {item.name}
                </Typography>
              </BlurImg>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default Recommendmv;
