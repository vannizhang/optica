import { PartialRootState } from './configureStore';

import { initialUIState, UIState } from '../store/reducers/UI';
import { initialMapState, MapState } from './reducers/Map';

const getPreloadedUIState = (): UIState => {
    return {
        ...initialUIState,
    };
};

const getPreloadedMapState = (): MapState => {
    return {
        ...initialMapState,
    };
};

const getPreloadedState = (): PartialRootState => {
    return {
        UI: getPreloadedUIState(),
        Map: getPreloadedMapState(),
    };
};

export default getPreloadedState;
