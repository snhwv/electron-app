import { Grid } from '@material-ui/core';
import AlbumInfo from './components/AlbumInfo';
import Disc from './components/Disc';
import SongListInfo from './components/SongListInfo';

const discWitdh = 38;

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
  );
};
export default PlayPlane;
