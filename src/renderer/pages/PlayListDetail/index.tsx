import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSongUrlById,
  fetchSongDetailById,
} from '@store/features/playSongSlice';
import api from './api';
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { getUserInfo } from '@store/features/userInfoSlice';
import Icon from '@components/Icon';
import { useHistory, useParams } from 'react-router-dom';

interface PlayListDetailProps {}

const PlayListDetail: React.FC<PlayListDetailProps> = () => {
  const [playListDetail, setPlayListDetail] = useState<any>(null);
  const [selectedSong, setselectedSong] = useState<any>(null);
  // const params: any = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    api.playListDetail({ id: 714758992 }).then((re) => {
      setPlayListDetail(re?.playlist || []);
    });
  }, []);

  const onSongClick = (album: any) => {
    setselectedSong(album);
  };
  const paly = (album: any) => {
    dispatch((fetchSongDetailById as any)(album?.id));
    dispatch((fetchSongUrlById as any)(album?.id));
  };
  return (
    <div>
      <Typography>我的歌单</Typography>
      <Grid
        container
        spacing={3}
        style={{
          padding: 20,
        }}
      >
        <Grid
          item
          xs
          style={{
            height: 400,
            overflow: 'auto',
          }}
        >
          <List>
            {playListDetail?.tracks?.map((item: any) => {
              return (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <>
                      <Icon
                        type="icon-play"
                        style={{
                          fontSize: 30,
                        }}
                        onClick={() => paly(item)}
                      ></Icon>
                    </>
                  }
                  disablePadding
                >
                  <ListItemButton
                    selected={selectedSong?.id === item.id}
                    onClick={() => onSongClick(item)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        <Grid
          item
          style={{
            width: 400,
            height: 400,
          }}
        >
          <img
            src={selectedSong?.coverImgUrl}
            style={{
              width: '100%',
              height: '100%',
            }}
          ></img>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlayListDetail;
