import generateAPI from '@utils/axios/generateAPI';

const apis = {
  songUrl: 'song/url',
  songDetail: 'song/detail',
  commentFloor: 'comment/floor',
  lyric: '/lyric',
};
const api = generateAPI(apis);
export default api;
