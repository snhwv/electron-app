import generateAPI from '@utils/axios/generateAPI';

const apis = {
  recommend: 'recommend/resource',
  banner: 'banner',
  artist: 'top/artists?offset=0&limit=4',
};
const api = generateAPI(apis);
export default api;
