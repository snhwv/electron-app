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
    path: '/playListDetail',
    // path: '/playListDetail/:id',
    icon: 'elevator',
  },
  // {
  //   label: "组织架构",
  //   componentName: "Organization",
  //   path: "/system/organization",
  //   icon: "elevator",
  // },
];

export default routes;
