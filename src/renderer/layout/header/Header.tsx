import Icon from '@components/Icon';
import {
  Avatar,
  Badge,
  Box,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailInfo } from '@store/features/userInfoSlice';
import { deepPurple } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import api from '../api';

const Header = () => {
  const userDetailInfo = useSelector(getUserDetailInfo);

  const [msg, setMsg] = useState<any>(null);

  useEffect(() => {
    api.msgPrivate({ limit: 100 }).then((re) => {
      setMsg(re);
    });
  }, []);

  return (
    <Grid
      container
      style={{
        padding: '10px 30px',
        position: 'absolute',
        top: 0,
        zIndex: 2,
      }}
    >
      <Grid item>
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
        xs
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
        }}
        className="windowHandler"
      ></Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
        }}
      >
        <Badge
          badgeContent={msg?.newMsgCount}
          color="primary"
          max={99}
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
        {/* <Avatar alt="Remy Sharp"  /> */}
        <Avatar
          sx={{ bgcolor: deepPurple[500], width: 30, height: 30 }}
          src={userDetailInfo?.profile?.avatarUrl}
        ></Avatar>
      </Grid>
    </Grid>
  );
};
export default Header;
