import generateAPI from '@utils/axios/generateAPI';

const apis = {
  recommend: 'recommend/resource',
  banner: 'banner',
  artist: 'top/artists?offset=0&limit=4',
  // login: 'login/cellphone?phone=17772450369&password=yang20050116..',
  // add: 'sale/order/add post',
  // update: 'sale/order/update post',
};
const api = generateAPI(apis);
export default api;
