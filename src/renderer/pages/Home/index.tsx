import { useEffect, useState } from 'react';
import api from './api';
import Banner from './components/Banner';
import Recommend from './components/Recommend';
const Page = () => {
  const [banner, setbanner] = useState([]);
  const [recommend, setrecommend] = useState([]);

  useEffect(() => {
    api.banner().then((re) => {
      setbanner(re?.banners || []);
    });
    api.recommend().then((re) => {
      setrecommend(re?.recommend || []);
      console.log(re);
    });
  }, []);
  return (
    <div>
      <div
        style={{
          width: '100%',
          height: 400,
        }}
      >
        <Banner bannerList={banner}></Banner>
        <Recommend recommendList={recommend}></Recommend>
      </div>
    </div>
  );
};
export default Page;
