import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import { Button, IconButton, Typography } from '@mui/material';
import Icon from '@components/Icon';
SwiperCore.use([Autoplay, EffectFade, Navigation]);
import BlurImg from '@components/BlurImg';
import style from '@style/custom/recommend.module.scss';
const boxSize = 135;
const RecommendCompilation: React.FC<{ recommendList: any[] }> = ({
  recommendList,
}) => {
  return (
    <div
      style={{
        padding: '32px 36px',
      }}
    >
      <Typography
        variant="h6"
        component="h6"
        sx={{
          marginBottom: '-40px',
          marginLeft: '10px',
          paddingTop: '10px',
        }}
      >
        推荐歌单
      </Typography>
      <Swiper
        pagination={{
          clickable: true,
        }}
        slidesPerView={6}
        spaceBetween={3}
        navigation={true}
        className={style['recommendSwipper']}
        style={{ height: '210px', width: '100%', paddingTop: '50px' }}
      >
        {recommendList?.map((item, index) => {
          return (
            <SwiperSlide
              style={{ height: '100%', position: 'relative' }}
              key={index}
            >
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '10px',
                  borderRadius: '40px 0px',
                  background: '#cd9999',
                  boxSizing: 'border-box',
                }}
              >
                <BlurImg
                  key={item.picUrl}
                  url={item.picUrl}
                  containerStyle={{
                    width: boxSize,
                    height: boxSize,
                    borderRadius: '24px 0px',
                  }}
                  blurStyle={{
                    display: 'none',
                    // filter: 'unset',
                    // background: 'unset',
                  }}
                  className={'recommendItem'}
                >
                  <IconButton
                    color="primary"
                    style={{
                      position: 'absolute',
                      left: '80px',
                      top: '80px',
                    }}
                  >
                    <Icon
                      type="icon-play"
                      style={{
                        marginRight: '-15px',
                        color: '#999797',
                        background: '#fff',
                        width: 30,
                        height: 30,
                        borderRadius: '20px',
                        lineHeight: '30px',
                        boxShadow: '0px 0px 0px 4px #ffffff96',
                      }}
                    />
                  </IconButton>
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 0,
                      width: 140,
                      background: '#2c2c2cc7',
                      color: '#fff',
                      padding: '10px',
                      boxSizing: 'border-box',
                      fontSize: '14px',
                      borderRadius: '16px 16px 0px 0px',
                      display: 'none',
                    }}
                  >
                    {item.name}
                  </Typography>
                </BlurImg>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default RecommendCompilation;
