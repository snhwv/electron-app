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
    <div
      style={{
        height: '100%',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      <Grid
        container
        style={{
          paddingTop: '50px',
          paddingBottom: '80px',
          background: `linear-gradient(124deg, rgb(255, 255, 255) 0px, rgb(255, 255, 255) 540px, transparent 540px, transparent),
            linear-gradient(rgb(160, 209, 242) 0px, rgb(160, 209, 242) 350px, rgb(230, 214, 139) 350px, rgb(230, 214, 139))`,
        }}
      >
        <Grid
          item
          container
          xs={12}
          style={{
            height: 500,
          }}
        >
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
    </div>
  );
});
export default PlayPlane;
