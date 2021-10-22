import { createSlice, createSelector } from '@reduxjs/toolkit';
import { isArray, mergeWith } from 'lodash';
import { REHYDRATE } from 'redux-persist';

const initialState: any = {
  collapsed: false,
  activeRoute: '',
};

// Thunk functions
// export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
//   const response = await client.get("/fakeApi/todos");
//   return response.todos;
// });
function customizer(objValue: any, srcValue: any) {
  if (isArray(objValue)) {
    return srcValue;
  }
}

const layoutDataSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    updateActiveRoute(state, action) {
      const activeRoute = action.payload;
      state.activeRoute = activeRoute;
    },
    // updateTableColumnById(state, action) {
    // mergeWith(columns[index], payload, customizer);
    // },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(REHYDRATE, (state, action: any) => {
  //     const settings = action.payload?.layout?.settings || {};
  //     updateSettingsReducer(state, { payload: settings });
  //   });
  // },
});
export const { updateActiveRoute } = layoutDataSlice.actions;

export default layoutDataSlice.reducer;

export const getActiveRoute = createSelector(
  (state: any) => state.layout,
  (layout: any) => layout.activeRoute
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
