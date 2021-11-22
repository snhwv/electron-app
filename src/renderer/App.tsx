import { MemoryRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useDispatch } from 'react-redux';
import store, { persistor } from './store';
import './style';

import routes, { RouteGenerator } from './router';

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        // {
        //   props: { noWrap: true },
        //   style: {
        //     whiteSpace: 'unset',
        //     WebkitLineClamp: 1,
        //     display: '-webkit-box',
        //     WebkitBoxOrient: 'vertical',
        //   },
        // },
      ],
    },
  },
  // palette: {
  //   text: {
  //     // primary: '#878787',
  //   },
  //   primary: {
  //     // light: '#ffc2ad',
  //     // main: '#fea181',
  //     // dark: '#df8d70',
  //     // contrastText: 'red',
  //   },
  // },
});
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router>
            <RouteGenerator routes={routes}></RouteGenerator>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
