import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Banner: React.FC<{ bannerList: any[] }> = ({ bannerList }) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="mySwiper"
        slidesPerView={1}
        style={{ height: '100%' }}
        effect={'fade'}
      >
        {bannerList?.map((item) => {
          return (
            <SwiperSlide style={{ height: '100%' }} key={item.imageUrl}>
              <img
                style={{ width: '100%', height: '100%' }}
                src={item.imageUrl}
              />
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide style={{ height: '100%' }}>
          <img
            style={{ width: '100%', height: '100%' }}
            src="https://swiperjs.com/demos/images/nature-2.jpg"
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: '100%' }}>
          <img
            style={{ width: '100%', height: '100%' }}
            src="https://swiperjs.com/demos/images/nature-3.jpg"
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: '100%' }}>
          <img
            style={{ width: '100%', height: '100%' }}
            src="https://swiperjs.com/demos/images/nature-4.jpg"
          />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
};
export default Banner;
