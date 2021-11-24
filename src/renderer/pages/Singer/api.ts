import generateAPI from '@utils/axios/generateAPI';

const apis = {
  artistDetail: 'artist/detail',
  artistAlbum: 'artist/album',
  albumDetail: 'album',
  topSong: 'artist/top/song',
  artistMv: 'artist/mv',
  simiArtist: 'simi/artist',
};
const api = generateAPI(apis);
export default api;
