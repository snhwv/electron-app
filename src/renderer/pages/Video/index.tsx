import {
  Box,
  Button,
  Divider,
  Grid,
  Popover,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import api from './api';

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }
const Video = () => {
  const [value, setValue] = useState<any>('videoAll');
  const handleChange = (_: any, val: any) => {
    console.log(val);
    setValue(val);
  };
  const theme = useTheme();
  return (
    <Box p={theme.spacing(0, 2)}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="videoAll" label="视频" />
        <Tab value="mv" label="mv" />
      </Tabs>
      <Box hidden={value !== 'videoAll'}>
        <VideoAll />
      </Box>
      <Box hidden={value !== 'mv'}>Item One</Box>
    </Box>
  );
};
const VideoAll = () => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [hotCategory, setHotCategory] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  useEffect(() => {
    api.videoCategoryList().then((re) => {
      setHotCategory(re?.data || []);
    });
    api.videoGroupList().then((re) => {
      setCategory(re?.data);
    });
  }, []);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const open = Boolean(anchorEl);
  return (
    <div>
      <Grid container justifyContent="space-between">
        <Button variant="outlined" onClick={handleClick}>
          Primary
        </Button>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            color: '#706f6f',
          }}
        >
          {hotCategory?.map((item) => {
            return (
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {item?.name}
              </Typography>
            );
          })}
        </Stack>
      </Grid>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          <Typography
            sx={{
              fontSize: '20px',
            }}
          >
            全部视频
          </Typography>
          <Divider
            style={{
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(2),
            }}
          />
          <Box
            sx={{
              width: 600,
              height: 300,
              overflow: 'auto',
            }}
          >
            {category?.map((item) => {
              return (
                <Typography
                  color="text.secondary"
                  sx={{
                    display: 'inline-block',
                    alignItems: 'center',
                    width: '20%',
                    textAlign: 'center',
                    height: '50px',
                  }}
                >
                  {item?.name}
                </Typography>
              );
            })}
          </Box>
        </Box>
      </Popover>
    </div>
  );
};
export default Video;
