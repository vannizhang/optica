import {
    createSlice,
    createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { WEB_MAP_ID_HYBRID } from '../../constants/map';

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

import IExtent from 'esri/geometry/Extent';

import { getItem } from '@esri/arcgis-rest-portal';
import { setHashParam } from '../../utils/URLHashParams';
import { getUserSession } from '../../utils/esri-oauth';

export type MapCenter = {
    lat?: number;
    lon?: number;
};

export type RequestError = {
    code?: string;
    message?: string;
};

export type MapState = {
    indexOfActiveMapPanel?: number;
    center?: MapCenter;
    zoom?: number;
    zoomLevels?: number[];
    relativeZoomLevels?: number[];
    scales?: number[];
    // extents JSON of each map panel as an array of strings
    extents?: string[];
    webmapId?: string;
    isLoadingWebmap?: boolean;
    isInvalidWebmapId?: boolean;
    webmapRequestError?: RequestError;
};

export const initialMapState: MapState = {
    indexOfActiveMapPanel: -1,
    center: {
        lat: 34.05624,
        lon: -117.1957,
    },
    zoom: 10,
    zoomLevels: [10, 12, 14],
    relativeZoomLevels: [-2, 0, 2],
    scales: [0, 0, 0],
    extents: [],
    webmapId: WEB_MAP_ID_HYBRID,
    isLoadingWebmap: false,
    webmapRequestError: null,
};

const slice = createSlice({
    name: 'Map',
    initialState: initialMapState,
    reducers: {
        webmapIdChanged: (state, action: PayloadAction<string>) => {
            state.webmapId = action.payload;
            state.isInvalidWebmapId = false;
        },
        invalidWebmapIdChanged: (state, action: PayloadAction<boolean>) => {
            state.isInvalidWebmapId = action.payload;
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
        scalesChanged: (state, action: PayloadAction<number[]>) => {
            state.scales = action.payload;
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
        webmapRequestErrorReceived: (
            state,
            action: PayloadAction<RequestError>
        ) => {
            state.webmapRequestError = action.payload;
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
    invalidWebmapIdChanged,
    scalesChanged,
    webmapRequestErrorReceived,
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

    if (zoomLevels[mapPanelIndex] === zoom) {
        return;
    }

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

    setHashParam('zoom', newZoomeLevels.join(','));
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

export const updateScale = (scale: number, mapPanelIndex: number) => (
    dispatch: StoreDispatch,
    getState: StoreGetState
) => {
    const { Map } = getState();
    const { scales } = Map;

    const newScales = [...scales];

    newScales[mapPanelIndex] = scale;

    dispatch(scalesChanged(newScales));
};

export const updateWebmapId = (id: string) => async (
    dispatch: StoreDispatch,
    getState: StoreGetState
) => {
    try {
        const itemData = await getItem(id, {
            authentication: getUserSession(),
        });

        if (itemData.type !== 'Web Map') {
            dispatch(setInvalidWebmapIdToTrue());
        } else {
            dispatch(webmapIdChanged(id));
            setHashParam('webmapId', id);
        }
    } catch (err) {
        console.log(err);
        const requestError: RequestError = {
            code: err.code || '',
            message: err.message || '',
        };
        dispatch(setWebmapRequestError(requestError));
    }
};

const setInvalidWebmapIdToTrue = () => async (
    dispatch: StoreDispatch,
    getState: StoreGetState
) => {
    dispatch(invalidWebmapIdChanged(true));

    setTimeout(() => {
        dispatch(invalidWebmapIdChanged(false));
    }, 5000);
};

const setWebmapRequestError = (error: RequestError) => async (
    dispatch: StoreDispatch,
    getState: StoreGetState
) => {
    dispatch(webmapRequestErrorReceived(error));

    setTimeout(() => {
        dispatch(webmapRequestErrorReceived(null));
    }, 5000);
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

export const scalesSelector = createSelector(
    (state: RootState) => state.Map.scales,
    (scales) => scales
);

export const relativeZoomLevelsSelector = createSelector(
    (state: RootState) => state.Map.relativeZoomLevels,
    (relativeZoomLevels) => relativeZoomLevels
);

export const indexOfActiveMapPanelSelector = createSelector(
    (state: RootState) => state.Map.indexOfActiveMapPanel,
    (indexOfActiveMapPanel) => indexOfActiveMapPanel
);

export const isInvalidWebmapIdSelector = createSelector(
    (state: RootState) => state.Map.isInvalidWebmapId,
    (isInvalidWebmapId) => isInvalidWebmapId
);

export const webmapRequestErrorSelector = createSelector(
    (state: RootState) => state.Map.webmapRequestError,
    (webmapRequestError) => webmapRequestError
);

export default reducer;
