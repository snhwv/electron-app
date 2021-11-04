import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlurImg from '@components/BlurImg';
import SongItem from '@components/SongItem';
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

import { Box } from '@mui/system';
const boxSize = 36;
interface PlayListDetailProps {}

const itemIconStyle = {
  fontSize: 16,
  marginRight: '4px',
  color: '#b9b9b9',
};
const PlayListDetail: React.FC<PlayListDetailProps> = () => {
  const [playListDetail, setPlayListDetail] = useState<any>({});
  const [selectedSong, setselectedSong] = useState<any>({});
  // const params: any = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    api.playListDetail({ id: 988690134 }).then((re) => {
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
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Typography variant="h6" component="h6">
        {playListDetail?.name}
      </Typography>
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
            height: 500,
            overflow: 'auto',
          }}
        >
          <List sx={{ width: '100%', overflowY: 'auto' }}>
            {playListDetail?.tracks?.map((item: any, index: number) => {
              return (
                <SongItem
                  key={index}
                  listItemProps={{
                    secondaryAction: (
                      <Box>
                        <Icon type="icon-download" style={itemIconStyle}></Icon>
                        <Icon type="icon-heart" style={itemIconStyle}></Icon>
                      </Box>
                    ),
                  }}
                >
                  <Typography
                    sx={{
                      width: 24,
                      marginRight: '10px',
                      color: '#8f8f8f',
                    }}
                  >
                    {index < 9 && 0}
                    {index + 1}
                  </Typography>
                  <BlurImg
                    url={item.al.picUrl}
                    containerStyle={{
                      width: boxSize,
                      height: boxSize,
                      marginRight: '15px',
                      borderRadius: '0px 10px',
                    }}
                    blurStyle={{
                      display: 'none',
                    }}
                  ></BlurImg>
                  <ListItemText
                    primary={item.name}
                    secondary={item.ar.map((item: any) => item.name).join()}
                  />
                </SongItem>
              );
            })}
          </List>
          {/* <List>
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
          </List> */}
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        <Grid
          item
          style={{
            width: 300,
            height: 400,
          }}
        >
          <BlurImg
            url={playListDetail?.coverImgUrl}
            containerStyle={{
              width: 240,
              height: 240,
            }}
            blurStyle={{
              display: 'none',
            }}
          ></BlurImg>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlayListDetail;
