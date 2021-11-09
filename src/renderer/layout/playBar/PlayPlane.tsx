import { Grid } from '@material-ui/core';
import AlbumInfo from './components/AlbumInfo';
import Disc from './components/Disc';
import SongListInfo from './components/SongListInfo';
const PlayPlane: React.FC<any> = () => {
  return (
    <Grid
      container
      style={{
        height: '100%',
        position: 'relative',
        paddingTop: '50px',
      }}
    >
      <Grid item xs={4}>
        <SongListInfo></SongListInfo>
      </Grid>
      <Grid item xs={4}>
        <Disc></Disc>
      </Grid>
      <Grid item xs={4}>
        <AlbumInfo></AlbumInfo>
      </Grid>
    </Grid>
  );
};
export default PlayPlane;
