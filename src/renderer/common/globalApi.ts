import generateAPI from '@utils/axios/generateAPI';

const apis = {
  songUrl: 'song/url',
  songDetail: 'song/detail',
  commentFloor: 'comment/floor',
};
const api = generateAPI(apis);
export default api;
