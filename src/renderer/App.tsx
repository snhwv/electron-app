import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import icon from '../../assets/icon.svg';
import './style';
import generateAPI from './utils/axios/generateAPI';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './layout/Layout';

const apis = {
  login: 'login/cellphone',
  playlist: 'user/playlist?uid=477944154',
  add: 'sale/order/add post',
  update: 'sale/order/update post',
};
const theme = createTheme({
  palette: {
    text: {
      // Purple and green play nicely together.
      primary: '#878787',
    },
  },
});
const api = generateAPI(apis);
export default function App() {
  React.useEffect(() => {
    // api.playlist().then((re) => {
    //   console.log(re);
    // });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
