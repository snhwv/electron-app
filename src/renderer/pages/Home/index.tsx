import { useEffect } from 'react';
import api from './api';
import Banner from './components/Banner';
const Page = () => {
  useEffect(() => {
    // api.banner().then((re) => {
    //   console.log(re);
    // });
    // api.recommend().then((re) => {
    //   console.log(re);
    // });
  }, []);
  return (
    <div>
      <div
        style={{
          width: '100%',
          height: 400,
        }}
      >
        <Banner></Banner>
      </div>
    </div>
  );
};
export default Page;
