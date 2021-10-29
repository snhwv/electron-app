import generateAPI from '@utils/axios/generateAPI';

const apis = {
  playListDetail: 'playlist/detail',
};
const api = generateAPI(apis);
export default api;
