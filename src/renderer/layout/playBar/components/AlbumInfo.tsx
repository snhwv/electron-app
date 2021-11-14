import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlaying,
  getLyric,
  getPlaySongInfo,
  getPlayCurrentTime,
} from '@store/features/playSongSlice';
import apis from '../../api';
const AlbumInfo: React.FC<any> = () => {
  const playSongInfo = useSelector(getPlaySongInfo);
  useEffect(() => {
    if (playSongInfo.id) {
      apis.simiPlayList({ id: playSongInfo.id }).then((re) => {
        console.log(re);
      });
    }
  }, []);

  return (
    <Grid
      container
      style={{
        height: '100%',
        position: 'relative',
      }}
    >
      <Grid item xs></Grid>
      <Grid item xs></Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};
export default AlbumInfo;
