import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Menu from './Menu';
import Icon from '../components/Icon';
import withAuth from '../router/witchAuth';
import dark from './dark.png';
import PlayBar from './PlayBar';
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
const Layout: React.FC<any> = ({ children }) => {
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
      <img
        src={dark}
        style={{
          position: 'fixed',
          width: '100vw',
          zIndex: 100,
          opacity: 0.8,
          pointerEvents: 'none'
        }}
      />
      <Grid
        container
        item
        xs
        style={{
          width: '100%',
          minWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Grid
          item
          style={{
            width: '240px',
            height: '100%',
            overflow: 'auto',
            borderRight: '1px solid #f3f3f3',
            paddingRight: '8px',
          }}
        >
          <Menu />
        </Grid>
        <Grid
          xs
          item
          style={{
            height: '100%',
            overflow: 'auto',
          }}
        >
          {children}
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
        <PlayBar />
      </Grid>
    </Grid>
  );
};

export default withAuth(Layout);
