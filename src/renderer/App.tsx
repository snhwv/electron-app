import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import icon from '../../assets/icon.svg';
import './App.global.css';
import generateAPI from './utils/axios/generateAPI';
import Button from '@material-ui/core/Button';
import Layout from './layout/Layout';

const apis = {
  login: 'login/cellphone',
  playlist: 'user/playlist?uid=477944154',
  add: 'sale/order/add post',
  update: 'sale/order/update post',
};
const api = generateAPI(apis);
export default function App() {
  React.useEffect(() => {
    api.playlist().then((re) => {
      console.log(re);
    });
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  );
}
