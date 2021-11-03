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
    zoom?: number;
    zoomLevels?: number[];
    relativeZoomLevels?: number[];
    webmapId?: string;
};

export const initialMapState: MapState = {
    indexOfActiveMapPanel: -1,
    center: {
        lat: 34.037321,
        lon: -117.067,
    },
    zoom: 10,
    zoomLevels: [10, 12, 14],
    relativeZoomLevels: [0, 2, 4],
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
        // mapZoomChanged: (state, action: PayloadAction<number>) => {
        //     state.zoom = action.payload;
        // },
        zoomLevelsChanged: (state, action: PayloadAction<number[]>) => {
            state.zoomLevels = action.payload;
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
    zoomLevelsChanged,
    indexOfActiveMapPanelChanged,
} = slice.actions;

const relativeZoomLevelLookup = [
    [0, 2, 4],
    [-2, 0, 2],
    [-4, -2, 0],
];

export const updateZoomLevels = (zoom: number, index: number) => (
    dispatch: StoreDispatch,
    getState: StoreGetState
) => {
    const { Map } = getState();
    const { zoomLevels } = Map;

    const relativeZoomLevels = relativeZoomLevelLookup[index];

    console.log(zoom);

    const newZoomeLevels = zoomLevels.map((currZoom, i) => {
        return zoom + relativeZoomLevels[i];
    });
    console.log(zoomLevels, newZoomeLevels);

    dispatch(zoomLevelsChanged(newZoomeLevels));
};

export const webmapIdSelector = createSelector(
    (state: RootState) => state.Map.webmapId,
    (webmapId) => webmapId
);

export const MapCenterSelector = createSelector(
    (state: RootState) => state.Map.center,
    (center) => center
);

export const zoomLevelsSelector = createSelector(
    (state: RootState) => state.Map.zoomLevels,
    (zoomLevels) => zoomLevels
);

export const indexOfActiveMapPanelSelector = createSelector(
    (state: RootState) => state.Map.indexOfActiveMapPanel,
    (indexOfActiveMapPanel) => indexOfActiveMapPanel
);

export default reducer;
