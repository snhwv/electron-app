import generateAPI from '@utils/axios/generateAPI';

const apis = {
  playListDetail: 'playlist/detail',
  comment: 'comment/playlist',
};
const api = generateAPI(apis);
export default api;
