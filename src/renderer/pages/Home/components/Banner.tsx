import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import { Button } from '@mui/material';
import Icon from '@components/Icon';
SwiperCore.use([Autoplay, EffectFade, Navigation]);

const Banner: React.FC<{ bannerList: any[] }> = ({ bannerList }) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={{
        //   delay: 5500,
        //   disableOnInteraction: false,
        // }}
        navigation={true}
        // loop={true}
        className="mySwiper"
        slidesPerView={1}
        style={{ height: '340px' }}
        effect={'fade'}
      >
        {bannerList?.map((item, index) => {
          return (
            <SwiperSlide style={{ height: '100%' }} key={item.imageUrl}>
              <img
                style={{ width: '100%', height: '100%' }}
                src={item.imageUrl}
              />
              <Button
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
              </Button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default Banner;
