import {
    createSlice,
    createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { WEB_MAP_ID, WEB_MAPS } from '../../constants/map';

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

import IExtent from 'esri/geometry/Extent';

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
    // extents JSON of each map panel as an array of strings
    extents?: string[];
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
    relativeZoomLevels: [-2, 0, 2],
    extents: [],
    webmapId: WEB_MAPS[0].id,
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
        extentsChanged: (state, action: PayloadAction<string[]>) => {
            state.extents = action.payload;
        },
        zoomLevelsChanged: (state, action: PayloadAction<number[]>) => {
            state.zoomLevels = action.payload;
        },
        relativeZoomLevelsChanged: (state, action: PayloadAction<number[]>) => {
            state.relativeZoomLevels = action.payload;
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
    relativeZoomLevelsChanged,
    indexOfActiveMapPanelChanged,
    extentsChanged,
} = slice.actions;

export const toggleLockRelativeZoomLevels = (mapPanelIndex: number) => (
    dispatch: StoreDispatch,
    getState: StoreGetState
) => {
    const { Map } = getState();
    const { zoomLevels, relativeZoomLevels } = Map;

    const shouldUnlock =
        relativeZoomLevels[mapPanelIndex] !== null &&
        relativeZoomLevels[mapPanelIndex + 1] !== null;

    const newRelativeZoomLevels = [...relativeZoomLevels];

    if (mapPanelIndex === 0) {
        newRelativeZoomLevels[0] = shouldUnlock
            ? null
            : zoomLevels[0] - zoomLevels[1];
    } else if (mapPanelIndex === 1) {
        newRelativeZoomLevels[2] = shouldUnlock
            ? null
            : zoomLevels[2] - zoomLevels[1];
    }

    dispatch(relativeZoomLevelsChanged(newRelativeZoomLevels));
};

export const updateZoomLevels = (zoom: number, mapPanelIndex: number) => (
    dispatch: StoreDispatch,
    getState: StoreGetState
) => {
    const { Map } = getState();
    const { zoomLevels, relativeZoomLevels } = Map;

    // lock && lock: [-2, 0, 2]
    // unlock && lock: [null, 0, 2]
    // lock && unlock: [-2, 0, null]
    // unlock && unlock: [null, 0, null]

    const targetVal = relativeZoomLevels[mapPanelIndex];

    const adjustedRelativeZoomLevels = relativeZoomLevels.map((val) => {
        if (val === null || targetVal === null) {
            return null;
        }

        return val - targetVal;
    });

    // console.log(adjustedRelativeZoomLevels)

    const newZoomeLevels = zoomLevels.map((currZoom, i) => {
        if (mapPanelIndex === i) {
            return zoom;
        }

        if (adjustedRelativeZoomLevels[i] === null) {
            return currZoom;
        }

        return zoom + adjustedRelativeZoomLevels[i];
    });

    // console.log(newZoomeLevels)

    // console.log(zoomLevels, newZoomeLevels);

    dispatch(zoomLevelsChanged(newZoomeLevels));
};

export const updateExtents = (extent: IExtent, mapPanelIndex: number) => (
    dispatch: StoreDispatch,
    getState: StoreGetState
) => {
    const { Map } = getState();
    const { extents } = Map;

    const newExtents = [...extents];

    newExtents[mapPanelIndex] = JSON.stringify(extent.toJSON());

    dispatch(extentsChanged(newExtents));
};

export const webmapIdSelector = createSelector(
    (state: RootState) => state.Map.webmapId,
    (webmapId) => webmapId
);

export const MapCenterSelector = createSelector(
    (state: RootState) => state.Map.center,
    (center) => center
);

export const extentsSelector = createSelector(
    (state: RootState) => state.Map.extents,
    (extents) => extents
);

export const zoomLevelsSelector = createSelector(
    (state: RootState) => state.Map.zoomLevels,
    (zoomLevels) => zoomLevels
);

export const relativeZoomLevelsSelector = createSelector(
    (state: RootState) => state.Map.relativeZoomLevels,
    (relativeZoomLevels) => relativeZoomLevels
);

export const indexOfActiveMapPanelSelector = createSelector(
    (state: RootState) => state.Map.indexOfActiveMapPanel,
    (indexOfActiveMapPanel) => indexOfActiveMapPanel
);

export default reducer;
