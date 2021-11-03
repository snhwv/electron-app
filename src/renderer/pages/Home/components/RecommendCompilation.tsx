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
const boxSize = 140;
const RecommendCompilation: React.FC<{ recommendList: any[] }> = ({
  recommendList,
}) => {
  return (
    <div>
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
        style={{ height: '180px', width: '100%', paddingTop: '50px' }}
      >
        {recommendList?.map((item, index) => {
          return (
            <SwiperSlide
              style={{ height: '100%', position: 'relative' }}
              key={index}
            >
              <BlurImg
                key={item.picUrl}
                url={item.picUrl}
                containerStyle={{
                  width: boxSize,
                  height: boxSize,
                }}
                blurStyle={{
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

              {/* <Button
                sx={{
                  position: 'absolute',
                  bottom: '50px',
                  left: '70px',
                  borderRadius: '50px',
                  height: '30px',
                  width: '90px',
                }}
                variant="contained"
                endIcon={
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
                }
              >
                <span
                  style={{
                    marginRight: 10,
                  }}
                >
                  播放
                </span>
              </Button> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default RecommendCompilation;
