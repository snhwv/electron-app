import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Menu from './Menu';
import Icon from '../components/Icon';
import withAuth from '../router/witchAuth';
import dark from './playbar.webp';
import PlayBar from './playBar/PlayBar';
import Header from './Header';
import generateAPI from '@utils/axios/generateAPI';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '@store/features/userInfoSlice';
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

const apis = {
  login: 'login/cellphone?phone=17772450369&password=yang20050116..',
};
const api = generateAPI(apis);
const Layout: React.FC<any> = ({ children }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    api.login().then((re) => {
      dispatch(updateUserInfo(re));
    });
  }, []);
  return (
    <Grid
      container
      direction={'column'}
      wrap={'wrap'}
      style={{
        height: '100%',
        position: 'relative',
      }}
    >
      <Grid
        container
        item
        xs
        style={{
          width: '100%',
          minWidth: '100%',
          overflow: 'hidden',
          paddingBottom: '68px',
        }}
      >
        <Grid
          item
          style={{
            width: '160px',
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
            position: 'relative',
            paddingTop: '50px',
          }}
        >
          <Header></Header>
          {children}
        </Grid>
      </Grid>
      <Grid
        item
        style={{
          width: '100%',
          minWidth: '100%',
          // height: '100%',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0px 0px 40px 0px #cfcfcf',
          zIndex: 1,
          position: 'absolute',
          background: 'beige',
          bottom: 0,
        }}
      >
        <PlayBar />
      </Grid>
    </Grid>
  );
};

export default withAuth(Layout);
