import Icon from '@components/Icon';
import {
  Avatar,
  Badge,
  Box,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const Header = () => {
  return (
    <Grid
      container
      style={{
        padding: '20px 30px 10px 30px',
        position: 'absolute',
        top: 0,
        zIndex: 2,
      }}
    >
      <Grid item xs>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            color: '#fff',
            width: 300,
            background: '#e3e3e3a6',
            height: 32,
            borderRadius: 4,
            paddingLeft: '8px',
            '.MuiInput-root:before': {
              display: 'none',
              content: 'unset',
            },
            '.MuiInput-root': {
              color: '#fff',
              fontSize: '0.8rem',
            },
          }}
        >
          <Icon
            type="icon-magnify"
            style={{
              fontSize: 24,
              lineHeight: '30px',
              width: '38px',
              color: '#fff',
            }}
          />
          <TextField variant="standard" fullWidth />
        </Box>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
        }}
      >
        <Badge
          badgeContent={4}
          color="primary"
          max={999}
          style={{
            marginRight: 10,
          }}
        >
          <Icon
            type="icon-email"
            style={{
              fontSize: 24,
            }}
          />
        </Badge>
        <Avatar sx={{ bgcolor: deepPurple[500], width: 30, height: 30 }}>
          OP
        </Avatar>
      </Grid>
    </Grid>
  );
};
export default Header;
