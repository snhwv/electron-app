import { lazy, Suspense } from 'react';
import routes, { RouteMata } from './routes';
// import Login from "@pages/login/loginPage";
import Loading from '@components/Loading';
import { Redirect, Route, Switch } from 'react-router-dom';
// import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import React from 'react';
import Layout from '../layout/Layout';
const Laziedviews = (item: RouteMata) => {
  return lazy(
    () =>
      import(
        `../pages/${item.structure ? item.structure + '/' : ''}${
          item.componentName
        }`
      )
  );
};
const doRoute = (routes: RouteMata[]) => {
  return routes.map((route) => {
    return {
      ...route,
      Component: Laziedviews(route),
    };
  });
};

const formatRoutes: RouteMata[] = [
  // {
  //   label: '登录',
  //   Component: Login,
  //   path: '/login',
  //   componentName: 'login',
  //   icon: 'login',
  // },
  {
    label: 'Layout',
    Component: Layout,
    path: '/',
    routes: doRoute(routes),
    redirect: '/Home',
    componentName: 'layout',
    icon: 'layout',
  },
];

export const RouteGenerator: React.FC<{
  routes: RouteMata[];
  parent?: RouteMata;
}> = ({ routes, parent }) => {
  const memoRoute = React.useMemo(() => {
    return routes.map((item) => {
      const Comp = item.Component!;
      return (
        <Route
          path={item.path}
          exact={item.exact}
          key={item.path}
          component={(props: any) => (
            <Comp {...props}>
              {item.routes?.length && (
                <RouteGenerator
                  routes={item.routes}
                  parent={item}
                ></RouteGenerator>
              )}
            </Comp>
          )}
        />
      );
    });
  }, []);
  return (
    <Suspense fallback={<Loading></Loading>}>
      <Switch>
        {parent?.redirect && (
          <Redirect exact from={parent.path} to={parent.redirect}></Redirect>
        )}
        {memoRoute}
      </Switch>
    </Suspense>
  );
};

export default formatRoutes;
