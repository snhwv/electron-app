import BlurImg from '@components/BlurImg';
import Icon from '@components/Icon';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListItemTypeMap,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
interface SongItemProps {
  listItemProps?: any;
}

const SongItem: React.FC<SongItemProps> = ({ listItemProps, children }) => {
  return (
    <ListItem
      disablePadding
      sx={{
        height: 54,
        '& > .MuiListItemButton-root': {
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
      {...listItemProps}
    >
      <ListItemButton>{children}</ListItemButton>
    </ListItem>
  );
};

export default SongItem;
