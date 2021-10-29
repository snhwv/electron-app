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
        padding: 20,
        position: 'sticky',
        top: 0,
        zIndex: 2,
        background: '#fff',
      }}
    >
      <Grid item xs>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            width: 400,
            '.MuiInput-root:before': {
              display: 'none',
              content: 'unset',
            },
          }}
        >
          <Icon
            type="icon-magnify"
            style={{
              fontSize: 34,
              lineHeight: '30px',
              width: '38px',
            }}
          />
          <TextField label="请输入..." variant="standard" fullWidth />
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
              fontSize: 40,
              lineHeight: '30px',
              width: '38px',
            }}
          />
        </Badge>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
      </Grid>
    </Grid>
  );
};
export default Header;
