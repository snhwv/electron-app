import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { isArray, mergeWith } from 'lodash';
import { REHYDRATE } from 'redux-persist';
import api from '@globalApi';
export const fetchSongUrlById = createAsyncThunk(
  'song/fetchSongUrl',
  async (id) => {
    const response = await api.songUrl({ id });
    return response.data?.[0];
  }
);
export const fetchSongDetailById = createAsyncThunk(
  'song/fetchSongDetail',
  async (ids) => {
    const response = await api.songDetail({ ids });
    return response.songs?.[0];
  }
);
const initialState: any = {
  playing: false,
  songId: '',
  audioUrl: '',
  playCurrentTime: '',
  songInfo: {},
};

const layoutDataSlice = createSlice({
  name: 'playSong',
  initialState,
  reducers: {
    // updateTableColumnById(state, action) {
    // mergeWith(columns[index], payload, customizer);
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchSongUrlById.fulfilled, (state, action) => {
      // Add user to the state array
      state.songId = action.payload?.id;
      state.audioUrl = action.payload?.url;

      // state.entities.push(action.payload);
    });
    builder.addCase(fetchSongDetailById.fulfilled, (state, action) => {
      // Add user to the state array
      const { name, ar: artist, al: album } = action.payload || {};
      state.songInfo = {
        name,
        artist,
        album,
      };
      // state.entities.push(action.payload);
    });
  },
});

export default layoutDataSlice.reducer;

export const getPlaySong = createSelector(
  (state: any) => state.playSong,
  (playSong: any) => playSong
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
