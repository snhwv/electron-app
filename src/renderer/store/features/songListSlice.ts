import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import _ from 'lodash';
import { isArray, mergeWith } from 'lodash';
import { REHYDRATE } from 'redux-persist';
import { fetchSongDetailById, fetchSongUrlById } from './playSongSlice';

const playTypeMethds: any = {
  order: (songList: any[], currentSongId: any, offset: any) => {
    let index = _.findIndex(songList, ['id', currentSongId]);
    if (index === songList.length - 1) {
      return undefined;
    }
    return songList[index + offset];
  },
  random: (songList: any[], currentSongId: any, offset: any) => {
    const index = Math.floor(Math.random() * songList.length);
    return songList[index];
  },
  loop: (songList: any[], currentSongId: any, offset: any) => {
    let index = _.findIndex(songList, ['id', currentSongId]);
    if (index === songList.length - 1) {
      index = 0;
    }
    return songList[index];
  },
  single: (songList: any[], currentSongId: any, offset: any) => {
    const index = _.findIndex(songList, ['id', currentSongId]);
    return songList[index];
  },
};

export const updateCurrentSong = createAsyncThunk(
  'songList/updateCurrentSong',
  async (currentSong: any, { getState, dispatch }) => {
    const songId = (getState() as any)?.playSong?.songId;
    if (songId !== currentSong.id) {
      dispatch((fetchSongDetailById as any)(currentSong?.id));
      dispatch((fetchSongUrlById as any)(currentSong?.id));
    }
    return currentSong;
  }
);

export const nextSong = createAsyncThunk(
  'songList/nextSong',
  async (_: any, { getState, dispatch }) => {
    const {
      playSongList = [],
      // order,random,loop,single
      playType = 'random',
      playIndex,
      playHistory,
    } = (getState() as any)?.songList;
    const songId = (getState() as any)?.playSong?.songId;
    let nextSong = null;
    if (playIndex < playHistory.length - 1) {
      nextSong = playHistory[playIndex + 1];
    } else {
      nextSong = playTypeMethds[playType](playSongList, songId, 1);
    }
    if (nextSong) {
      dispatch((fetchSongDetailById as any)(nextSong?.id));
      dispatch((fetchSongUrlById as any)(nextSong?.id));
    }
    return { song: nextSong, indexOffset: 1 };
  }
);
export const prevSong = createAsyncThunk(
  'songList/prevSong',
  async (_: any, { getState, dispatch }) => {
    const {
      playSongList = [],
      // order,random,loop,single
      playType = 'random',
      playIndex,
      playHistory,
    } = (getState() as any)?.songList;
    let prevSong = null;
    if (playIndex - 1 >= 0) {
      prevSong = playHistory[playIndex - 1];
      if (prevSong) {
        dispatch((fetchSongDetailById as any)(prevSong?.id));
        dispatch((fetchSongUrlById as any)(prevSong?.id));
      }
      return { song: prevSong, indexOffset: -1 };
    }
    return undefined;
  }
);
const initialState: any = {
  id: '',
  playSongList: [],
  // order,random,loop,single
  playType: 'random',
  playIndex: -1,
  // 播放历史
  playHistory: [],
  playListInfo: {},
};

const songListSlice = createSlice({
  name: 'songList',
  initialState,
  reducers: {
    updatePlaySongList(state, action) {
      const { id, playSongList, playListInfo } = action.payload;
      if (id !== state.id) {
        state.id = id;
        state.playSongList = playSongList;
        state.playListInfo = playListInfo;
        state.playIndex = -1;
        state.playHistory = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCurrentSong.fulfilled, (state, action) => {
      state.playIndex += 1;
      state.playHistory.push(action.payload);
    });
    builder.addCase(nextSong.fulfilled, (state, action) => {
      if (action.payload.song) {
        state.playIndex += action.payload.indexOffset;
        if (state.playIndex === state.playHistory.length) {
          state.playHistory.push(action.payload.song);
        }
      }
    });
    builder.addCase(prevSong.fulfilled, (state, action) => {
      if (action.payload) {
        state.playIndex += action.payload.indexOffset;
      }
    });
  },
});
export const { updatePlaySongList } = songListSlice.actions;

export default songListSlice.reducer;

export const getSongList = createSelector(
  (state: any) => {
    return state.songList.playSongList;
  },
  (playSongList: any) => {
    return playSongList;
  }
);
export const getSongListInfo = createSelector(
  (state: any) => state.songList.playListInfo,
  (playListInfo: any) => playListInfo
);
