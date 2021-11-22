import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomImg from '@components/CustomImg';
import {
  fetchSongUrlById,
  fetchSongDetailById,
} from '@store/features/playSongSlice';
import api from './api';
import globalApi from '@globalApi';
import {
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Icon from '@components/Icon';
import { useHistory, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { toShortZHNumber } from '@utils/funcs';
import Comment from '@components/Comment';
import SongList from './components/SongListContainer';

const boxSize = 36;
interface PlayListDetailProps {}

const itemIconStyle = {
  fontSize: 16,
  marginRight: '4px',
  color: '#b9b9b9',
};
const PlayListDetail: React.FC<PlayListDetailProps> = () => {
  const [playListDetail, setPlayListDetail] = useState<any>({});

  const [songs, setSongs] = useState<any[]>([]);

  const [sourceId, setsourceId] = useState<any>();
  const params: any = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    setsourceId(params.id);
    api
      .playListDetail({ id: params.id })
      .then((re) => {
        setPlayListDetail(re?.playlist || []);
        return globalApi.songDetail({
          ids: re?.playlist?.trackIds.map((item: any) => item.id).join(),
        });
      })
      .then((re) => {
        re?.songs.forEach((item: any, index: number) => {
          item.privilege = re?.privileges?.[index];
        });
        setSongs(re?.songs || []);
      });
  }, [params.id]);

  const paly = (album: any) => {
    dispatch((fetchSongDetailById as any)(album?.id));
    dispatch((fetchSongUrlById as any)(album?.id));
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Typography
        variant="h6"
        component="h6"
        ml={3}
        mt={2}
      >
        {playListDetail?.name}
        {playListDetail?.tags?.map((item: any) => {
          return (
            <Chip
              key={item}
              style={{
                marginLeft: '8px',
              }}
              color="primary"
              label={item}
              size="small"
            />
          );
        })}
      </Typography>
      <Grid
        container
        spacing={3}
        style={{
          padding: 20,
        }}
      >
        <SongList songs={songs} playListDetail={playListDetail} />
        <Grid item xs={5}>
          <CustomImg
            url={playListDetail?.coverImgUrl}
            imgWidth={400}
            containerStyle={{
              width: '100%',
              paddingTop: '100%',
              height: 0,
            }}
            blurStyle={{
              display: 'none',
            }}
          >
            <Typography
              style={{
                position: 'absolute',
                color: '#fff',
                background: 'rgb(98 98 98 / 82%)',
                fontSize: '13px',
                bottom: '9%',
                width: '78%',
                left: '4%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 7,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {playListDetail?.description}
            </Typography>
          </CustomImg>
          <Stack
            justifyContent="flex-start"
            direction="row"
            flexWrap="nowrap"
            paddingTop="10px"
            alignItems="center"
          >
            <CustomImg
              url={playListDetail?.creator?.avatarUrl}
              imgWidth={30}
              containerStyle={{
                width: '30px',
                paddingTop: '30px',
                height: 0,
                borderRadius: 60,
              }}
              blurStyle={{
                display: 'none',
              }}
            ></CustomImg>
            <Typography
              style={{
                fontSize: '13px',
                color: '#0076bb',
                marginLeft: '4px',
                marginRight: '8px',
              }}
            >
              {playListDetail?.creator?.nickname}
            </Typography>
            <Typography
              style={{
                fontSize: '13px',
              }}
            >
              {dayjs(playListDetail?.createTime).format('YYYY-MM-DD')}创建
            </Typography>
          </Stack>
          <Stack
            justifyContent="flex-start"
            direction="row"
            flexWrap="nowrap"
            paddingTop="10px"
            alignItems="center"
          >
            <Typography
              style={{
                fontSize: '13px',
                marginRight: '18px',
              }}
            >
              歌曲数：{playListDetail?.trackCount}
            </Typography>
            <Typography
              style={{
                fontSize: '13px',
              }}
            >
              播放量：{toShortZHNumber(playListDetail?.playCount)}
            </Typography>
          </Stack>
          <Stack
            justifyContent="space-between"
            direction="row"
            flexWrap="nowrap"
            paddingTop="10px"
          >
            <Button
              variant="outlined"
              size="small"
              style={{
                height: 30,
                borderRadius: 30,
                minWidth: 90,
                color: '#424242',
                borderColor: '#424242',
              }}
              endIcon={
                <Icon type="icon-folder-outline" style={{ color: '#424242' }} />
              }
            >
              收藏
            </Button>
            <Button
              variant="outlined"
              size="small"
              style={{
                height: 30,
                borderRadius: 30,
                minWidth: 90,
                color: '#424242',
                borderColor: '#424242',
              }}
              endIcon={
                <Icon type="icon-share-variant" style={{ color: '#424242' }} />
              }
            >
              分享
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                height: 30,
                borderRadius: 30,
                minWidth: 110,
                color: '#424242',
                borderColor: '#424242',
              }}
              endIcon={
                <Icon type="icon-download" style={{ color: '#424242' }} />
              }
            >
              下载全部
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Comment fetchApi={api.comment} sourceId={sourceId}></Comment>
    </div>
  );
};

export default PlayListDetail;
