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
  containerStyle?: any;
}

const SongItem: React.FC<SongItemProps> = ({
  listItemProps,
  children,
  containerStyle,
}) => {
  return (
    <ListItem
      disablePadding
      sx={{
        height: 54,
        '& > .MuiListItemButton-root': {
          paddingTop: 0,
          paddingBottom: 0,
          maxWidth: '100%',
        },
        '& .MuiTypography-root': {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-all',
        },
        ...containerStyle,
      }}
      {...listItemProps}
    >
      <ListItemButton>{children}</ListItemButton>
    </ListItem>
  );
};

export default SongItem;
