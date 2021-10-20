import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Menu from './Menu';
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});
const Layout = () => {
  const classes = useStyles();
  return (
    // spacing={2}
    <Grid
      container
      direction={'column'}
      wrap={'wrap'}
      style={{
        height: '100%',
      }}
    >
      <Grid
        container
        xs
        style={{
          width: '100%',
          minWidth: '100%',
        }}
      >
        <Grid xs={4}>
          <Menu />
        </Grid>
      </Grid>
      <Grid
        item
        xs={2}
        style={{
          width: '100%',
          minWidth: '100%',
        }}
      >
        <div>xs=4</div>
      </Grid>
    </Grid>
  );
};

export default Layout;
