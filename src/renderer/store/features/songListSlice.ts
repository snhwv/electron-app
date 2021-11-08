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
      playType = 'order',
    } = (getState() as any)?.songList;
    const songId = (getState() as any)?.playSong?.songId;
    const nextSong = playTypeMethds[playType](playSongList, songId, 1);
    if (nextSong) {
      dispatch((fetchSongDetailById as any)(nextSong?.id));
      dispatch((fetchSongUrlById as any)(nextSong?.id));
    }
    return nextSong;
  }
);
const initialState: any = {
  id: '',
  playSongList: [],
  // order,random,loop,single
  playType: 'order',
  playIndex: 0,
  // 播放历史
  playHistory: [],
};

const songListSlice = createSlice({
  name: 'songList',
  initialState,
  reducers: {
    updatePlaySongList(state, action) {
      const { id, playSongList } = action.payload;
      if (id !== state.id) {
        state.id = id;
        state.playSongList = playSongList;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCurrentSong.fulfilled, (state, action) => {
      // state.playIndex = state.playIndex + 1;
      // state.playHistory.push() = state.playIndex + 1;
    });
    builder.addCase(nextSong.fulfilled, (state, action) => {

    });
  },
});
export const { updatePlaySongList } = songListSlice.actions;

export default songListSlice.reducer;

export const getSongList = createSelector(
  (state: any) => state.songList,
  (songList: any) => songList.playSongList
);
