import {
    createSlice,
    createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { WEB_MAP_ID } from '../../constants/map';

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type MapCenter = {
    lat?: number;
    lon?: number;
};

export type MapState = {
    indexOfActiveMapPanel?: number;
    center?: MapCenter;
    webmapId?: string;
};

export const initialMapState: MapState = {
    indexOfActiveMapPanel: -1,
    center: {
        lat: 40,
        lon: -110,
    },
    webmapId: WEB_MAP_ID,
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
        indexOfActiveMapPanelChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.indexOfActiveMapPanel = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    webmapIdChanged,
    mapCenterChanged,
    indexOfActiveMapPanelChanged,
} = slice.actions;

export const webmapIdSelector = createSelector(
    (state: RootState) => state.Map.webmapId,
    (webmapId) => webmapId
);

export const MapCenterSelector = createSelector(
    (state: RootState) => state.Map.center,
    (center) => center
);

export const indexOfActiveMapPanelSelector = createSelector(
    (state: RootState) => state.Map.indexOfActiveMapPanel,
    (indexOfActiveMapPanel) => indexOfActiveMapPanel
);

export default reducer;
