import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import CustomImg from '@components/CustomImg';
import TypographyText from '@components/TypographyText';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import style from '@style/custom/singer.module.scss';
import api from './api';
import Icon from '@components/Icon';
import SongList from '@components/SongList';
const boxSize = 112;
const Singer = () => {
  const params: any = useParams();
  const [artistDetail, setArtistDetail] = useState<any>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [albumDetails, setAlbumDetails] = useState<any[]>([]);
  const [top50, setTop50] = useState<any[]>([]);
  const singerId = params.id;

  const fetchalbumDetails = (albums: any[]) => {
    const albumDetails = albums?.map((item) => {
      return api.albumDetail({ id: item?.id });
    });
    Promise.all(albumDetails).then((re) => {
      setAlbumDetails(
        re.map((item) => {
          return {
            songs: item.songs,
          };
        })
      );
    });
  };
  useEffect(() => {
    api.artistDetail({ id: singerId }).then((re) => {
      console.log(re);
      setArtistDetail(re?.data);
    });
    api
      .artistAlbum({ id: singerId })
      .then((re) => {
        setAlbums(re?.hotAlbums || []);
        return re?.hotAlbums || [];
      })
      .then((albums) => {
        fetchalbumDetails(albums);
      });
    api.topSong({ id: singerId }).then((re) => {
      setTop50(re?.songs || []);
    });
  }, [params.id]);

  return (
    <div style={{ marginTop: -50 }}>
      <CustomImg
        key={artistDetail?.artist?.cover}
        url={artistDetail?.artist?.cover}
        imgWidth={800}
        containerStyle={{
          width: '100%',
          borderRadius: 0,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
          height: 0,
          paddingTop: '100%',
        }}
        blurStyle={{
          display: 'none',
        }}
        className={'albumImg'}
      ></CustomImg>
      <Swiper
        pagination={{
          clickable: true,
        }}
        slidesPerView={4}
        navigation={true}
        style={{ height: '400px', width: '100%' }}
        className={style['albumSwiper']}
      >
        <SwiperSlide
          style={{
            height: '100%',
            position: 'relative',
          }}
          key={'top 50'}
          className={'albumItem'}
        >
          <div className={'alContainer'}>
            <CustomImg
              url={
                'http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100'
              }
              imgWidth={400}
              containerStyle={{
                width: '100%',
                height: '100%',
                borderRadius: 0,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '400px 400px',
              }}
              blurStyle={{
                display: 'none',
              }}
              className={'albumImg'}
            >
              <SongList
                height={330}
                songs={top50}
                playListDetail={{ id: singerId }}
                className={'songList'}
                songItemProps={{
                  showImg: false,
                  prefix: () => null,
                  suffixIcons: [],
                }}
              />

              <IconButton
                color="primary"
                style={{
                  position: 'absolute',
                  left: '60px',
                  top: '20px',
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

              <TypographyText fontSize={'small'} className={'albumName'}>
                top 50
              </TypographyText>
            </CustomImg>
          </div>
        </SwiperSlide>
        {albums?.map((item, index) => {
          return (
            <SwiperSlide
              style={{
                height: '100%',
                position: 'relative',
              }}
              key={index}
              className={'albumItem'}
            >
              <div className={'alContainer'}>
                <CustomImg
                  key={item.picUrl}
                  url={item.picUrl}
                  imgWidth={400}
                  containerStyle={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '400px 400px',
                  }}
                  blurStyle={{
                    display: 'none',
                  }}
                  className={'albumImg'}
                >
                  <SongList
                    height={330}
                    songs={albumDetails?.[index]?.songs || []}
                    playListDetail={item}
                    className={'songList'}
                    songItemProps={{
                      showImg: false,
                      prefix: () => null,
                      suffixIcons: [],
                    }}
                  />

                  <IconButton
                    color="primary"
                    style={{
                      position: 'absolute',
                      left: '60px',
                      top: '20px',
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

                  <TypographyText fontSize={'small'} className={'albumName'}>
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
export default Singer;
