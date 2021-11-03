import generateAPI from '@utils/axios/generateAPI';

const apis = {
  recommend: 'recommend/resource',
  banner: 'banner',
  artist: 'top/artists',
  recommendSongs: 'recommend/songs',
  personalizedMv: 'personalized/mv',
};
const api = generateAPI(apis);
export default api;
