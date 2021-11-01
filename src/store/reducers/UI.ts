import {
    createSlice,
    createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

type MapPanelsDirection = 'horizontal' | 'vertical';

type MapPanelsInfo = {
    direction?: MapPanelsDirection;
    num?: number;
};

export type UIState = {
    mapPanelsInfo?: MapPanelsInfo;
};

export const initialUIState: UIState = {
    mapPanelsInfo: {
        direction: 'horizontal',
        num: 3,
    },
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
