import {
    createSlice,
    createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

type MapPanelsInfo = {
    direction?: string;
    num?: number;
};

export type UIState = {
    mapPanelsInfo?: MapPanelsInfo;
};

export const initialUIState: UIState = {
    mapPanelsInfo: null,
};

const slice = createSlice({
    name: 'UI',
    initialState: initialUIState,
    reducers: {
        mapPanelsInfoChanged: (state, action: PayloadAction<MapPanelsInfo>) => {
            state.mapPanelsInfo = action.payload;
        },
    },
});

const { reducer } = slice;

export const { mapPanelsInfoChanged } = slice.actions;

export const mapPanelsInfoSelector = createSelector(
    (state: RootState) => state.UI.mapPanelsInfo,
    (mapPanelsInfo) => mapPanelsInfo
);

export default reducer;
