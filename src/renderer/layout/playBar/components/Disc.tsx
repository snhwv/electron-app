import { Grid } from '@material-ui/core';
import disc from '@assets/disc.png';
import needle from '@assets/needle.png';
const Disc: React.FC<any> = () => {
  return (
    <Grid
      // container
      style={{
        height: '100%',
        position: 'relative',
      }}
    >
      <img
        style={{
          position: 'absolute',
          width: '100%',
        }}
        src={disc}
      ></img>
      <img
        style={{
          position: 'absolute',
          width: '100%',
        }}
        src={needle}
      ></img>
    </Grid>
  );
};
export default Disc;
