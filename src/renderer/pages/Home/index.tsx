import { Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import api from './api';
import Banner from './components/Banner';
import PrivateContent from './components/PrivateContent';
import RecommendCompilation from './components/RecommendCompilation';
import Recommendmv from './components/Recommendmv';
import RecommendSongList from './components/RecommendSongList';
import Singer from './components/Singer';
const Page = () => {
  const [banner, setbanner] = useState([]);
  const [recommend, setrecommend] = useState([]);
  const [singerList, setsingerList] = useState([]);
  const [songList, setsongList] = useState([]);
  const [mv, setmv] = useState([]);
  const [contentList, setcontentList] = useState([]);

  useEffect(() => {
    api.banner().then((re) => {
      setbanner(re?.banners || []);
    });
    api.recommend().then((re) => {
      setrecommend(re?.recommend || []);
    });
    api.artist().then((re) => {
      setsingerList(re?.artists?.slice(0, 5) || []);
    });
    api.recommendSongs().then((re) => {
      setsongList(re?.data?.dailySongs || []);
    });
    api.personalizedMv().then((re) => {
      setmv(re?.result || []);
    });
    api.privatecontent().then((re) => {
      setcontentList(re?.result || []);
    });
  }, []);
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Banner bannerList={banner}></Banner>
      <RecommendCompilation recommendList={recommend}></RecommendCompilation>
      <Grid
        container
        style={{
          paddingLeft: 30,
          paddingTop: '13px',
          flexWrap: 'nowrap',
        }}
      >
        <Grid item xs>
          <RecommendSongList songList={songList}></RecommendSongList>
        </Grid>
        <Grid
          item
          sx={{
            padding: '0px 44px 0px 25px',
            minWidth: '420px',
          }}
        >
          <Singer singerList={singerList}></Singer>
          <Recommendmv mv={mv}></Recommendmv>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          padding: 20,
        }}
      >
        <PrivateContent contentList={contentList}></PrivateContent>
      </Grid>
    </Box>
  );
};
export default Page;
