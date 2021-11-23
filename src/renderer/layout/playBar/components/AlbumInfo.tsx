import { Chip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPlaySongInfo } from '@store/features/playSongSlice';
import apis from '../../api';
import CustomImg from '@components/CustomImg';
import Icon from '@components/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import disc from '@assets/disc.png';
import SwiperCore, { EffectFade, Navigation, Autoplay } from 'swiper';
import { Box } from '@mui/system';

import dayjs from 'dayjs';
import TypographyText from '@components/TypographyText';

SwiperCore.use([Autoplay, EffectFade, Navigation]);
const AlbumInfo: React.FC<any> = () => {
  const playSongInfo = useSelector(getPlaySongInfo);

  const [simmiPlayList, setSimmiPlayList] = useState<any[]>([]);

  const [activePlayList, setActivePlayList] = useState<any>(null);

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (playSongInfo.id) {
      apis.simiPlayList({ id: playSongInfo.id }).then((re) => {
        setSimmiPlayList(re?.playlists || []);
      });
    }
  }, [playSongInfo]);
  useEffect(() => {
    if (simmiPlayList.length) {
      setActivePlayList(simmiPlayList[0]);
    }
  }, [simmiPlayList]);

  const onSwiperItemClick = (index: number) => {
    swiperRef.current.slideTo(index);
  };
  const onChange = (swiper: any) => {
    setActivePlayList(simmiPlayList[swiper.activeIndex]);
  };

  return (
    <Box
      sx={{
        height: '100%',
        position: 'relative',
        flexDirection: 'column',
        paddingLeft: '60px',
        paddingTop: '140px',
      }}
    >
      <Swiper
        slidesPerView={1.5}
        spaceBetween={3}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onActiveIndexChange={onChange}
        style={{
          height: '145px',
          width: '100%',
          margin: 0,
        }}
      >
        {simmiPlayList?.map((item, index) => {
          return (
            <SwiperSlide
              style={{ height: '100%', position: 'relative' }}
              key={index}
              onClick={() => onSwiperItemClick(index)}
            >
              <div
                style={{
                  width: '68%',
                  height: '100%',
                }}
              >
                <CustomImg
                  key={item.coverImgUrl}
                  url={item.coverImgUrl}
                  imgWidth={150}
                  containerStyle={{
                    width: '100%',
                    paddingTop: '100%',
                    borderRadius: '4px',
                  }}
                  blurStyle={{
                    display: 'none',
                  }}
                  className={'recommendItem'}
                ></CustomImg>
              </div>
              <img
                style={{
                  width: '68%',
                  position: 'absolute',
                  top: 0,
                  left: '20%',
                  zIndex: -1,
                  background:
                    'radial-gradient(black,black 50%, transparent 50%,transparent)',
                }}
                src={disc}
              ></img>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Box
        sx={{
          paddingRight: '10px',
        }}
      >
        <TypographyText fontSize={'smaller'} color="text.secondary">
          {activePlayList?.creator?.nickname}
        </TypographyText>
        <TypographyText
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TypographyText
            nowrap
            fontWeight={'bold'}
            fontSize={'large'}
            component={'span'}
          >
            {activePlayList?.name}
          </TypographyText>
          <Icon
            type="icon-heart"
            style={{
              fontSize: '20px',
            }}
          ></Icon>
        </TypographyText>
        <TypographyText fontSize={'small'}>
          {activePlayList?.tags?.map((tag: string) => {
            return (
              <Chip
                key={tag}
                label={tag}
                color="primary"
                size="small"
                sx={{
                  mr: 1,
                }}
              />
            );
          })}
          <span
            style={{
              float: 'right',
            }}
          >
            {dayjs(activePlayList?.createTime).format('YYYY.MM.DD')}
          </span>
        </TypographyText>

        <TypographyText
          fontSize={'small'}
          color="text.secondary"
          noWrap
          pt={1}
          sx={{
            maxHeight: '174px',
            WebkitLineClamp: 7,
            whiteSpace: 'unset',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {activePlayList?.description}
        </TypographyText>
      </Box>
    </Box>
  );
};
export default AlbumInfo;
