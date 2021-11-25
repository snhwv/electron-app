import generateAPI from '@utils/axios/generateAPI';

const apis = {
  videoCategoryList: 'video/category/list',
  videoGroupList: 'video/group/list',
};
const api = generateAPI(apis);
export default api;
