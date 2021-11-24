import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import CustomImg from '@components/CustomImg';
import TypographyText from '@components/TypographyText';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import style from '@style/custom/singer.module.scss';
import api from './api';
import Icon from '@components/Icon';
import SongList from '@components/SongList';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { toShortZHNumber, formatDuration } from '@utils/funcs';
const boxSize = 112;
const Singer = () => {
  const params: any = useParams();
  const [artistDetail, setArtistDetail] = useState<any>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [albumDetails, setAlbumDetails] = useState<any[]>([]);
  const [top50, setTop50] = useState<any[]>([]);
  const [mvs, setMvs] = useState<any[]>([]);
  const [simiArtists, setSimiArtists] = useState<any[]>([]);
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
    api.artistMv({ id: singerId, limit: 12 }).then((re) => {
      setMvs(re?.mvs || []);
    });
    api.simiArtist({ id: singerId }).then((re) => {
      setSimiArtists(re?.artists?.slice(0, 12) || []);
    });
  }, [params.id]);

  const theme = useTheme();
  return (
    <div style={{ marginTop: -50 }}>
      <Grid container>
        <Grid item>
          <CustomImg
            key={artistDetail?.artist?.cover}
            url={artistDetail?.artist?.cover}
            imgWidth={800}
            containerStyle={{
              width: '400px',
              height: '400px',
              borderRadius: 0,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% auto',
            }}
            blurStyle={{
              display: 'none',
            }}
          ></CustomImg>
        </Grid>
        <Grid xs p={theme.spacing(2, 2)} item sx={{}}>
          <TypographyText
            sx={{
              fontSize: 40,
              fontWeight: 'bold',
            }}
          >
            {artistDetail?.artist?.name}
          </TypographyText>
          <Stack direction="row" flexWrap="nowrap" paddingTop="10px">
            <Button
              variant="outlined"
              size="small"
              style={{
                height: 30,
                borderRadius: 30,
                minWidth: 90,
                color: '#424242',
                borderColor: '#424242',
                marginLeft: '16px',
              }}
              endIcon={
                <Icon type="icon-folder-outline" style={{ color: '#424242' }} />
              }
            >
              收藏
            </Button>
            {artistDetail?.user?.userId && (
              <Button
                variant="outlined"
                size="small"
                style={{
                  height: 30,
                  borderRadius: 30,
                  minWidth: 90,
                  color: '#424242',
                  borderColor: '#424242',
                  marginLeft: '16px',
                }}
                endIcon={
                  <Icon
                    type="icon-share-variant"
                    style={{ color: '#424242' }}
                  />
                }
              >
                个人主页
              </Button>
            )}
          </Stack>
          <Stack direction="row" flexWrap="nowrap" paddingTop="10px">
            <TypographyText ml={2}>
              单曲数：{artistDetail?.artist?.musicSize}
            </TypographyText>
            <TypographyText ml={2}>
              专辑数：{artistDetail?.artist?.albumSize}
            </TypographyText>
            <TypographyText ml={2}>
              MV数：{artistDetail?.artist?.mvSize}
            </TypographyText>
          </Stack>
          <Box
            sx={{
              height: 200,
              overflow: 'auto',
              paddingTop: '10px',
            }}
          >
            <TypographyText ml={2} color="text.secondary">
              {artistDetail?.artist?.briefDesc}
            </TypographyText>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}
          >
            {simiArtists?.map((item) => {
              return (
                <CustomImg
                  key={item?.picUrl}
                  url={item?.picUrl}
                  imgWidth={40}
                  containerStyle={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '20px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% auto',
                    marginLeft: '-10px',
                  }}
                  blurStyle={{
                    display: 'none',
                  }}
                ></CustomImg>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <TypographyText
        noWrap
        mt={2}
        mb={1}
        p={theme.spacing(0, 1)}
        style={{
          fontSize: '1.6rem',
          background: '#e1b5bf',
          color: '#fff',
          display: 'inline-block',
        }}
      >
        专辑
      </TypographyText>
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
      <TypographyText
        noWrap
        mt={2}
        mb={1}
        p={theme.spacing(0, 1)}
        style={{
          fontSize: '1.6rem',
          background: '#e1b5bf',
          color: '#fff',
          display: 'inline-block',
        }}
      >
        MV
      </TypographyText>
      <Box>
        {mvs?.map((item) => {
          return (
            <CustomImg
              key={item?.imgurl}
              url={item?.imgurl}
              imgWidth={400}
              containerStyle={{
                width: '33.33%',
                height: 200,
                borderRadius: 0,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% auto',
              }}
              blurStyle={{
                display: 'none',
              }}
              className={'albumImg'}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                  background: '#000000a1',
                }}
              ></div>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translate(0px, -50%)',
                  width: '80%',
                  marginLeft: '10%',
                }}
              >
                <TypographyText
                  ml={2}
                  noWrap
                  style={{
                    color: '#fff',
                    fontSize: '1.2rem',
                    width: '75%',
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  {item?.name}
                </TypographyText>
                <div
                  style={{
                    width: '80%',
                    height: '4px',
                    background: '#fff',
                    margin: 'auto',
                  }}
                ></div>
                <TypographyText
                  ml={2}
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    margin: 'auto',
                  }}
                >
                  播放量：{toShortZHNumber(item?.playCount)}
                </TypographyText>
              </Box>

              <TypographyText
                ml={2}
                style={{
                  color: '#fff',
                  position: 'absolute',
                  bottom: 0,
                  right: 10,
                }}
                component="span"
              >
                {formatDuration(item?.duration / 1000)}
              </TypographyText>
            </CustomImg>
          );
        })}
      </Box>
    </div>
  );
};
export default Singer;
