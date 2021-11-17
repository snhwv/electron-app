import generateAPI from '@utils/axios/generateAPI';

const apis = {
  //   privilege.fee
  // 8、0：免费
  // 4：所在专辑需单独付费
  // 1：VIP可听
  // privilege.cs:云盘
  // privilege.st：-200无版权
  // item.dl===999000
  playListDetail: 'playlist/detail',
  comment: 'comment/playlist',
};
const api = generateAPI(apis);
export default api;
