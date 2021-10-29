import generateAPI from '@utils/axios/generateAPI';

const apis = {
  likelist: 'likelist',
  playlist: 'user/playlist',
};
const api = generateAPI(apis);
export default api;
