import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import Icon from '../components/Icon';
type ImenuItem = {
  title: string;
  icon: IconType;
  suffix?: () => JSX.Element;
};
const menuItems: ImenuItem[] = [
  {
    title: '发现音乐',
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

const Menu = () => {
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
      {menuItems.map((item) => {
        return (
          <ListItem>
            <Icon type={item.icon} />
            <ListItemText id="switch-list-label-wifi" primary={item.title} />
            {item?.suffix?.()}
            {/* <Switch
              edge="end"
              onChange={handleToggle('wifi')}
              checked={checked.indexOf('wifi') !== -1}
              inputProps={{
                'aria-labelledby': 'switch-list-label-wifi',
              }}
            /> */}
          </ListItem>
        );
      })}
    </List>
  );
};
export default Menu;
