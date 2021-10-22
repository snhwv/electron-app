import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Layout from './layout/Layout';
import generateAPI from './utils/axios/generateAPI';
import store, { persistor } from './store';
import './style';

import routes, { RouteGenerator } from './router';

const apis = {
  login: 'login/cellphone',
  playlist: 'user/playlist?uid=477944154',
  add: 'sale/order/add post',
  update: 'sale/order/update post',
};
const theme = createTheme({
  palette: {
    text: {
      primary: '#878787',
    },
  },
});
const api = generateAPI(apis);
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router>
            <RouteGenerator routes={routes}></RouteGenerator>
            {/* <Switch>
              <Route path="/" component={Layout} />
            </Switch> */}
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
