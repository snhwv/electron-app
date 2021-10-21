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

type ImenuItem = {
  title: string;
  icon: IconType;
  suffix?: () => JSX.Element;
  children?: ImenuItem[];
};
const menuItems: ImenuItem[] = [
  {
    title: '发现音乐',
    icon: 'icon-AddProducts',
    children: [
      {
        title: '播客',
        icon: 'icon-AddProducts',
      },
      {
        title: '视频',
        icon: 'icon-AddProducts',
      },
      {
        title: '播客',
        icon: 'icon-AddProducts',
      },
      {
        title: '视频',
        icon: 'icon-AddProducts',
      },
    ],
  },
  {
    title: '播客',
    icon: 'icon-AddProducts',
  },
  {
    title: '视频',
    icon: 'icon-AddProducts',
  },
  {
    title: '朋友',
    icon: 'icon-AddProducts',
  },
  {
    title: '直播',
    icon: 'icon-AddProducts',
  },
  {
    title: '私人FM',
    icon: 'icon-AddProducts',
  },
  {
    title: '直播',
    icon: 'icon-AddProducts',
  },
  {
    title: '直播',
    icon: 'icon-AddProducts',
  },
  {
    title: '直播',
    icon: 'icon-AddProducts',
  },
];

const MenuItem: React.FC<{ item: ImenuItem; isChild?: boolean }> = ({
  item,
  isChild = false,
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        onClick={item?.children && handleClick}
        className={style['menuList']}
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
            color: 'text.primary',
          }}
          primary={item.title}
        />
        <Icon type={'icon-arrow-right'} />
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
      {listData.map((item, index) => {
        return <MenuItem item={item} key={index} isChild={isChild}></MenuItem>;
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
    ></Box>
  );
};

const Menu = () => {
  return (
    <>
      <MenuHeader></MenuHeader>
      <MenuList listData={menuItems}></MenuList>
    </>
  );
};
export default Menu;
