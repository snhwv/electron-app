import { Divider, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import api from './api';
import Header from './components/Header';
import Recommend from './components/Recommend';
import Singer from './components/Singer';
const Page = () => {
  // const [banner, setbanner] = useState([]);
  const [recommend, setrecommend] = useState([]);
  const [singerList, setsingerList] = useState([]);

  useEffect(() => {
    // api.banner().then((re) => {
    //   setbanner(re?.banners || []);
    // });
    api.recommend().then((re) => {
      setrecommend(re?.recommend?.slice(0, 6) || []);
    });
    api.artist().then((re) => {
      setsingerList(re?.artists || []);
    });
  }, []);
  return (
    <>
      <Header></Header>
      <Grid
        container
        style={{
          padding: 20,
        }}
      >
        <Grid item>
          <Recommend recommendList={recommend}></Recommend>
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
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
    </>

    // <div>
    //   <div
    //     style={{
    //       width: '100%',
    //       height: 400,
    //     }}
    //   >
    //     {/* <Banner bannerList={banner}></Banner> */}

    //     <Header></Header>
    //     <Recommend recommendList={recommend}></Recommend>
    //   </div>
    // </div>
  );
};
export default Page;
