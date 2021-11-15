import generateAPI from '@utils/axios/generateAPI';

const apis = {
  userPlayList: 'user/playlist',
  simiPlayList: 'simi/playlist',
  commentMusic: 'comment/music',
};
const api = generateAPI(apis);
export default api;
