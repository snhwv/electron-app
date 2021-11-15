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
import { getUserId } from '@store/features/userInfoSlice';
import Icon from '@components/Icon';
import { useHistory } from 'react-router-dom';

interface PlayListProps {}

const PlayList: React.FC<PlayListProps> = () => {
  const dispatch = useDispatch();
  const uid = useSelector(getUserId);
  const [playList, setplayList] = useState<any[]>([]);
  const [selectedAlbum, setselectedAlbum] = useState<any>(null);

  const history = useHistory();
  useEffect(() => {
    api.playlist({ uid }).then((re) => {
      setplayList(re?.playlist || []);
    });
  }, []);

  const onAlbumClick = (album: any) => {
    setselectedAlbum(album);
  };
  const onShowMoreClick = (album: any) => {
    history.push(`/playListDetail/${album?.id}`);
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
            {playList?.map((item) => {
              return (
                <ListItem
                  secondaryAction={
                    <>
                      <Icon
                        type="icon-play"
                        style={{
                          fontSize: 30,
                        }}
                      ></Icon>
                      <Icon
                        type="icon-dots-horizontal"
                        style={{
                          fontSize: 30,
                        }}
                        onClick={() => onShowMoreClick(item)}
                      ></Icon>
                    </>
                  }
                  disablePadding
                >
                  <ListItemButton
                    selected={selectedAlbum?.id === item.id}
                    onClick={() => onAlbumClick(item)}
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
            src={selectedAlbum?.coverImgUrl}
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

export default PlayList;
