import {
    createSlice,
    createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type MapPanelsDirection = 'horizontal' | 'vertical';

export type MapPanelsInfo = {
    direction?: MapPanelsDirection;
    num?: number;
};

export type UIState = {
    mapPanelsInfo?: MapPanelsInfo;
    isControlPanelVisible?: boolean;
};

export const initialUIState: UIState = {
    mapPanelsInfo: {
        direction: 'horizontal',
        num: 3,
    },
    isControlPanelVisible: true,
};

const slice = createSlice({
    name: 'UI',
    initialState: initialUIState,
    reducers: {
        mapPanelsInfoChanged: (state, action: PayloadAction<MapPanelsInfo>) => {
            state.mapPanelsInfo = action.payload;
        },
        isControlPanelVisibleToggled: (state) => {
            state.isControlPanelVisible = !state.isControlPanelVisible;
        },
    },
});

const { reducer } = slice;

export const {
    mapPanelsInfoChanged,
    isControlPanelVisibleToggled,
} = slice.actions;

export const mapPanelsInfoSelector = createSelector(
    (state: RootState) => state.UI.mapPanelsInfo,
    (mapPanelsInfo) => mapPanelsInfo
);

export const isControlPanelVisibleSelector = createSelector(
    (state: RootState) => state.UI.isControlPanelVisible,
    (isControlPanelVisible) => isControlPanelVisible
);

export default reducer;
