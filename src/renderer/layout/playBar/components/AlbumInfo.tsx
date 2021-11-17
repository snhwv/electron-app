import { Grid } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlaying,
  getLyric,
  getPlaySongInfo,
  getPlayCurrentTime,
} from '@store/features/playSongSlice';
import apis from '../../api';
import CustomImg from '@components/CustomImg';
import Icon from '@components/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import disc from '@assets/disc.png';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import style from '@style/custom/recommend.module.scss';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import dayjs from 'dayjs';

SwiperCore.use([Autoplay, EffectFade, Navigation]);
const AlbumInfo: React.FC<any> = () => {
  const playSongInfo = useSelector(getPlaySongInfo);

  const [simmiPlayList, setSimmiPlayList] = useState<any[]>([]);

  const [activePlayList, setActivePlayList] = useState<any>(null);

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (playSongInfo.id) {
      apis.simiPlayList({ id: playSongInfo.id }).then((re) => {
        console.log(re?.playlists);
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
        <Typography
          sx={{
            fontSize: '0.8rem',
            color: '#979797',
          }}
        >
          {activePlayList?.creator?.nickname}
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              whiteSpace: 'nowrap' /* 规定文本是否折行 */,
              overflow: 'hidden' /* 规定超出内容宽度的元素隐藏 */,
              textOverflow: 'ellipsis',
            }}
          >
            {activePlayList?.name}
          </span>
          <Icon
            type="icon-heart"
            style={{
              fontSize: '20px',
            }}
          ></Icon>
        </Typography>
        <Typography
          sx={{
            fontSize: '0.8rem',
          }}
        >
          {activePlayList?.tags?.map((tag: string) => {
            return (
              <span
                style={{
                  color: 'rgb(0, 118, 187)',
                  marginRight: '10px',
                }}
              >
                {tag}
              </span>
            );
          })}
          <span
            style={{
              float: 'right',
            }}
          >
            {dayjs(activePlayList?.createTime).format('YYYY.MM.DD')}
          </span>
        </Typography>

        <Typography
          sx={{
            maxHeight: '174px',
            paddingTop: '10px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#747474',
            fontSize: '0.9rem',
          }}
          style={{
            WebkitLineClamp: 7,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {activePlayList?.description}
        </Typography>
      </Box>
    </Box>
  );
};
export default AlbumInfo;
