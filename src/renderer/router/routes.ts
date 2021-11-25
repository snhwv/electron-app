export interface RouteMata {
  label: string;
  componentName: string;
  path: string;
  icon: string;
  structure?: string;
  redirect?: string;
  Component?:
    | React.LazyExoticComponent<React.ComponentType<any>>
    | React.FC<any>;
  exact?: boolean;
  routes?: RouteMata[];
}

const routes: RouteMata[] = [
  {
    label: '首页',
    componentName: 'Home',
    path: '/home',
    icon: 'elevator',
  },
  {
    label: '首页',
    componentName: 'PlayList',
    path: '/playList',
    icon: 'elevator',
  },
  {
    label: '首页',
    componentName: 'PlayListDetail',
    path: '/playListDetail/:id',
    icon: 'elevator',
  },
  {
    label: '首页',
    componentName: 'Singer',
    path: '/singer/:id',
    icon: 'elevator',
  },
  {
    label: '首页',
    componentName: 'Video',
    path: '/video',
    icon: 'elevator',
  },
];

export default routes;
