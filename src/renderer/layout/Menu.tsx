import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '../components/Icon';
import { Collapse } from '@mui/material';
import classnames from 'classnames';
import { Box } from '@mui/system';
import style from './menu.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '@store/features/userInfoSlice';
import {
  getActiveRoute,
  updateActiveRoute,
} from '../store/features/layoutSlice';
import { useEffect, useState } from 'react';
import api from './api';
import { Link, useHistory } from 'react-router-dom';
type ImenuItem = {
  title: string;
  icon: IconType;
  path: string;
  suffix?: () => JSX.Element;
  children?: ImenuItem[];
};
const menuItems: ImenuItem[] = [
  {
    title: '发现音乐',
    icon: 'icon-watermark',
    path: 'discover',
    children: [
      {
        title: '播客',
        icon: 'icon-watermark',
        path: 'discover/blog',
      },
      {
        title: '视频',
        icon: 'icon-watermark',
        path: 'video',
      },
      {
        title: '朋友',
        icon: 'icon-watermark',
        path: 'discover/friend',
      },
      {
        title: '直播',
        icon: 'icon-watermark',
        path: 'discover/live',
      },
      {
        title: '私人FM',
        icon: 'icon-watermark',
        path: 'discover/fm',
      },
    ],
  },
  {
    title: '我的音乐',
    icon: 'icon-watermark',
    path: 'mine',
    children: [
      {
        title: '本地音乐',
        icon: 'icon-watermark',
        path: 'mine/localMusic',
      },
      {
        title: '最近播放',
        icon: 'icon-watermark',
        path: 'mine/recent',
      },
      {
        title: '我的音乐云盘',
        icon: 'icon-watermark',
        path: 'mine/cloud',
      },
      {
        title: '我的播客',
        icon: 'icon-watermark',
        path: 'mine/myBlog',
      },
      {
        title: '我的收藏',
        icon: 'icon-watermark',
        path: 'mine/collection',
      },
    ],
  },
];

const MenuItem: React.FC<{ item: ImenuItem; isChild?: boolean }> = ({
  item,
  isChild = false,
}) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const activeRoute = useSelector(getActiveRoute);

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    if (item?.children) {
      setOpen(!open);
    } else {
      dispatch(updateActiveRoute(item.path));
      history.push(item.path);
    }
  };

  let active = activeRoute === item.path;
  if (
    item?.children?.length &&
    open === false &&
    item.children.map((item) => item.path).includes(activeRoute)
  ) {
    active = true;
  }
  return (
    <>
      <ListItem
        onClick={handleClick}
        className={classnames(
          { [style['activeMenuItem']]: active },
          style['menuList']
        )}
      >
        <Icon
          type={item.icon}
          className={classnames('sidebarMenuIcon', { alwayShow: !isChild })}
        />
        <ListItemText
          className={classnames({
            menuTextBolder: !isChild,
          })}
          sx={{
            '& > .MuiTypography-root': {
              color: 'text.primary',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            },
          }}
          primary={item.title}
        />
        {/* <Icon type={'icon-arrow-right'} /> */}
        {item?.suffix?.()}
      </ListItem>
      {item?.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <MenuList listData={item.children!} isChild={true} />
        </Collapse>
      )}
    </>
  );
};

const MenuList: React.FC<{ listData: ImenuItem[]; isChild?: boolean }> = ({
  listData,
  isChild,
}) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }} disablePadding>
      {listData.map((item) => {
        return (
          <MenuItem item={item} key={item.path} isChild={isChild}></MenuItem>
        );
      })}
    </List>
  );
};

const MenuHeader = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 100,
      }}
      // className={'menuHeader'}
    >
      <Link to="/home">云音乐</Link>
    </Box>
  );
};

const Menu = () => {
  const uid = useSelector(getUserId);
  const [playList, setplayList] = useState<any[]>([]);
  useEffect(() => {
    api.userPlayList({ uid: uid }).then((re: any) => {
      const playlist = re?.playlist || [];
      const ownList = {
        title: '创建的歌单',
        icon: 'icon-watermark',
        path: 'create',
        children: playlist
          .filter((item: any) => item.userId === uid)
          .map((item: any) => {
            return {
              title: item.name,
              icon: 'icon-watermark',
              path: `/playListDetail/${item.id}`,
            };
          }),
      };
      const subList = {
        title: '收藏的歌单',
        icon: 'icon-watermark',
        path: 'sub',
        children: playlist
          .filter((item: any) => item.userId !== uid)
          .map((item: any) => {
            return {
              title: item.name,
              icon: 'icon-watermark',
              path: `/playListDetail/${item.id}`,
            };
          }),
      };
      setplayList([ownList, subList]);
    });
  }, []);
  return (
    <>
      <MenuHeader></MenuHeader>
      <MenuList listData={[...menuItems, ...playList]}></MenuList>
    </>
  );
};
export default Menu;
