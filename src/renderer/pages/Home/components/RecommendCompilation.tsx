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
import CustomImg from '@components/CustomImg';
import style from '@style/custom/recommend.module.scss';
import { useHistory } from 'react-router-dom';
import TypographyText from '@components/TypographyText';
const boxSize = 112;
const RecommendCompilation: React.FC<{ recommendList: any[] }> = ({
  recommendList,
}) => {
  const history = useHistory();
  const onClick = (album: any) => {
    history.push(`/playListDetail/${album?.id}`);
  };
  return (
    <div>
      <Typography variant="h6" component="h6" ml={1} pt={1} mb={-5}>
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
              className={'swiperItem'}
            >
              <div style={{}} className={'alContainer'}>
                <CustomImg
                  key={item.picUrl}
                  url={item.picUrl}
                  imgWidth={112}
                  containerStyle={{
                    width: boxSize,
                    height: boxSize,
                    borderRadius: '24px 0px',
                  }}
                  blurStyle={{
                    display: 'none',
                  }}
                  className={'recommendItem'}
                >
                  <IconButton
                    color="primary"
                    style={{
                      position: 'absolute',
                      left: '60px',
                      top: '60px',
                    }}
                    onClick={() => onClick(item)}
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

                  <TypographyText
                    fontSize={'small'}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      width: boxSize,
                      background: '#2c2c2cc7',
                      color: '#fff',
                      boxSizing: 'border-box',
                      borderRadius: '24px 0px 0px 0px',
                      display: 'none',
                    }}
                    className={style['recommendDesc']}
                  >
                    {item.name}
                  </TypographyText>
                </CustomImg>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default RecommendCompilation;
