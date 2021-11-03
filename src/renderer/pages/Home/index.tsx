import { Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import api from './api';
import Banner from './components/Banner';
import Header from './components/Header';
import RecommendCompilation from './components/RecommendCompilation';
import RecommendSongList from './components/RecommendSongList';
import Singer from './components/Singer';
const Page = () => {
  const [banner, setbanner] = useState([]);
  const [recommend, setrecommend] = useState([]);
  const [singerList, setsingerList] = useState([]);
  const [songList, setsongList] = useState([]);

  useEffect(() => {
    api.banner().then((re) => {
      setbanner(re?.banners || []);
    });
    api.recommend().then((re) => {
      setrecommend(re?.recommend || []);
    });
    api.artist().then((re) => {
      setsingerList(re?.artists || []);
    });
    api.recommendSongs().then((re) => {
      setsongList(re?.data?.dailySongs || []);
    });
  }, []);
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Banner bannerList={banner}></Banner>
      <Header></Header>
      <RecommendCompilation recommendList={recommend}></RecommendCompilation>
      <Grid
        container
        style={{
          padding: 20,
        }}
      >
        <Grid item xs>
          <RecommendSongList songList={songList}></RecommendSongList>
        </Grid>
        <Grid item xs>
          <Singer singerList={singerList}></Singer>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          padding: 20,
        }}
      ></Grid>
    </Box>

    // <div>
    //   <div
    //     style={{
    //       width: '100%',
    //       height: 400,
    //     }}
    //   >
    //     <RecommendCompilation recommendList={recommend}></RecommendCompilation>
    //   </div>
    // </div>
  );
};
export default Page;
