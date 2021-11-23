import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { isArray, mergeWith } from 'lodash';
import { REHYDRATE } from 'redux-persist';
import api from '@globalApi';
const splitLyc = (lyric = '') => {
  return lyric
    .split(/[\n]/) // 截取中括号
    .map((item: any) => {
      let temp: Array<string> = item.split(/\[(.+?)\]/);

      return {
        time: temp[1], // 时间
        lyc: temp[2], //歌词内容
      };
    })
    .filter((v: any) => v['lyc'])
    .map((item: any) => {
      const time = item.time;
      const m = time.match(/^(\d+):/);
      const s = time.match(/:(\d+)\./);
      const ms = time.match(/\.(\d+)$/);
      return {
        ...item,
        time:
          Number(`${Number(m[1]) * 60 + Number(s[1])}.${Number(ms[1])}`) * 1000,
        originTime: time,
      };
    }); // 去除无歌词内容
};
export const fetchSongUrlById = createAsyncThunk(
  'song/fetchSongUrl',
  async (id, { getState }) => {
    const songId = (getState() as any)?.playSong.songId;
    if (songId === id) {
      return;
    }
    const response = await api.songUrl({ id });
    return response.data?.[0];
  }
);
export const fetchSongDetailById = createAsyncThunk(
  'song/fetchSongDetail',
  async (ids, { getState }) => {
    const songId = (getState() as any)?.playSong.songId;
    if (songId === ids) {
      return;
    }
    const response = await api.songDetail({ ids });
    const lyric = await api.lyric({ id: ids });
    return {
      songDetail: response.songs?.[0],
      lyric,
    };
  }
);
const initialState: any = {
  playing: false,
  songId: '',
  audioUrl: '',
  lyric: {},
  playCurrentTime: '',
  playDurationTime: '',
  volume: 0.5,
  songInfo: {},
};

const layoutDataSlice = createSlice({
  name: 'playSong',
  initialState,
  reducers: {
    playDurationTime(state, action) {
      state.playDurationTime = action.payload;
    },
    setPlaying(state, action) {
      state.playing = action.payload;
    },
    updateVolume(state, action) {
      state.volume = action.payload;
    },
    playCurrentTime(state, action) {
      state.playCurrentTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSongUrlById.fulfilled, (state, action) => {
      if (action.payload?.id) {
        state.songId = action.payload?.id;
        state.audioUrl = action.payload?.url;
      }
    });
    builder.addCase(fetchSongDetailById.fulfilled, (state, action) => {
      const { songDetail, lyric } = action.payload || {};
      const { name, ar: artist, al: album, dt, id } = songDetail || {};
      if (name) {
        const originLyric = splitLyc(lyric?.lrc?.lyric);
        const tlyric = splitLyc(lyric?.tlyric?.lyric);

        state.lyric = {
          lyric: originLyric.map((item) => {
            const t = tlyric.find((titem) => titem.time === item.time);
            return {
              ...item,
              tlyc: t?.lyc,
            };
          }),
          // tlyric: splitLyc(lyric?.tlyric?.lyric),
        };
        state.songInfo = {
          name,
          id,
          artist,
          album,
        };
        state.playDurationTime = Math.round(dt / 1000);
      }
    });
  },
});

export const { playDurationTime, setPlaying, playCurrentTime, updateVolume } =
  layoutDataSlice.actions;

export default layoutDataSlice.reducer;

export const getPlaySong = createSelector(
  (state: any) => state.playSong,
  (playSong: any) => playSong
);
export const getPlaySongInfo = createSelector(
  (state: any) => {
    return state.playSong.songInfo;
  },
  (playSong: any) => {
    return playSong;
  }
);
export const getLyric = createSelector(
  (state: any) => state.playSong.lyric,
  (lyric: any) => lyric
);
export const getPlayDurationTime = createSelector(
  (state: any) => state.playSong.playDurationTime,
  (playDurationTime: any) => playDurationTime
);
export const getAudioUrl = createSelector(
  (state: any) => state.playSong.audioUrl,
  (audioUrl: any) => audioUrl
);
export const getPlaying = createSelector(
  (state: any) => state.playSong.playing,
  (playing: any) => playing
);
export const getPlayCurrentTime = createSelector(
  (state: any) => state.playSong.playCurrentTime,
  (playCurrentTime: any) => playCurrentTime
);
export const getVolume = createSelector(
  (state: any) => state.playSong.volume,
  (volume: any) => volume
);
// export const getLayoutActiveData = createSelector(
//   // First, pass one or more "input selector" functions:
//   getLayoutDataEntities,
//   (state) => state.editor.layoutActive.activeId,
//   // Then, an "output selector" that receives all the input results as arguments
//   // and returns a final result value
//   (entities, activeId) => {
//     return entities[activeId];
//   }
// );
