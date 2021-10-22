import { MemoryRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import './style';

import routes, { RouteGenerator } from './router';

import generateAPI from '@utils/axios/generateAPI';

const apis = {
  login: 'login/cellphone?phone=17772450369&password=yang20050116..',
};
const api = generateAPI(apis);
api.login();
const theme = createTheme({
  palette: {
    text: {
      primary: '#878787',
    },
  },
});
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
