import {
    createSlice,
    createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type MapCenter = {
    lat?: number;
    lon?: number;
};

export type MapState = {
    center?: MapCenter;
    webmapId?: string;
};

export const initialMapState: MapState = {
    center: {
        lat: 40,
        lon: -90,
    },
    webmapId: '5f3b7605b3364e7bb2416c93fae00995',
};

const slice = createSlice({
    name: 'Map',
    initialState: initialMapState,
    reducers: {
        webmapIdChanged: (state, action: PayloadAction<string>) => {
            state.webmapId = action.payload;
        },
        mapCenterChanged: (state, action: PayloadAction<MapCenter>) => {
            state.center = action.payload;
        },
    },
});

const { reducer } = slice;

export const { webmapIdChanged } = slice.actions;

export const webmapIdSelector = createSelector(
    (state: RootState) => state.Map.webmapId,
    (webmapId) => webmapId
);

export default reducer;
