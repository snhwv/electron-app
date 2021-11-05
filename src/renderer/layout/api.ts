import generateAPI from '@utils/axios/generateAPI';

const apis = {
  userPlayList: 'user/playlist',
};
const api = generateAPI(apis);
export default api;
