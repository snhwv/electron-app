import { Grid } from '@material-ui/core';
import React from 'react';
import api from '../api';
import AlbumInfo from './components/AlbumInfo';
import Disc from './components/Disc';
import SongListInfo from './components/SongListInfo';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '@components/Comment';
import {
  getPlaying,
  getLyric,
  getPlaySongInfo,
  getPlayCurrentTime,
} from '@store/features/playSongSlice';

const discWitdh = 38;

const PlayPlane: React.FC<any> = React.memo(() => {
  const playSongInfo = useSelector(getPlaySongInfo);
  return (
    <Grid
      container
      style={{
        height: '100%',
        position: 'relative',
        paddingTop: '50px',
        overflow: 'auto',
      }}
    >
      <Grid item container xs={12}>
        <Grid
          item
          style={{
            maxWidth: `${(100 - discWitdh) / 2}%`,
            flexBasis: `${(100 - discWitdh) / 2}%`,
          }}
        >
          <SongListInfo></SongListInfo>
        </Grid>
        <Grid
          item
          style={{
            maxWidth: `${discWitdh}%`,
            flexBasis: `${discWitdh}%`,
          }}
        >
          <Disc></Disc>
        </Grid>
        <Grid
          item
          style={{
            maxWidth: `${(100 - discWitdh) / 2}%`,
            flexBasis: `${(100 - discWitdh) / 2}%`,
          }}
        >
          <AlbumInfo></AlbumInfo>
        </Grid>
      </Grid>
      <Comment
        fetchApi={api.commentMusic}
        sourceId={playSongInfo?.id}
      ></Comment>
    </Grid>
  );
});
export default PlayPlane;
