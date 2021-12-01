import { PartialRootState } from './configureStore';

import {
    initialUIState,
    MapPanelsDirection,
    UIState,
} from '../store/reducers/UI';
import { initialMapState, MapState } from './reducers/Map';

import { DEFAULT_HASH_PARAMS } from '../utils/URLHashParams';

const getPreloadedUIState = (): UIState => {
    const { layout } = DEFAULT_HASH_PARAMS;

    const state: UIState = {
        ...initialUIState,
    };

    if (layout) {
        const [direction, num] = layout.split(',');

        state.mapPanelsInfo = {
            direction: direction as MapPanelsDirection,
            num: +num,
        };
    }

    return state;
};

const getPreloadedMapState = (): MapState => {
    const { zoom, webmapId, center } = DEFAULT_HASH_PARAMS;

    const state: MapState = {
        ...initialMapState,
    };

    if (webmapId) {
        state.webmapId = webmapId;
    }

    if (center) {
        const [lon, lat] = center.split(',').map((d) => +d);

        state.center = {
            lon,
            lat,
        };
    }

    if (zoom) {
        const zoomLevels = zoom.split(',').map((d) => +d);
        const relativeZoomLevels: number[] = [
            zoomLevels[0] - zoomLevels[1],
            0,
            zoomLevels[2] - zoomLevels[1],
        ];
        state.zoomLevels = zoomLevels;
        state.relativeZoomLevels = relativeZoomLevels;
    }

    return state;
};

const getPreloadedState = (): PartialRootState => {
    return {
        UI: getPreloadedUIState(),
        Map: getPreloadedMapState(),
    };
};

export default getPreloadedState;
