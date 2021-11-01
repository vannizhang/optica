import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    indexOfActiveMapPanelChanged,
    indexOfActiveMapPanelSelector,
} from '../../store/reducers/Map';
import { mapPanelsInfoSelector } from '../../store/reducers/UI';
import MapPanel from './MapPanels';

const MapPanelsContainer = () => {
    const dispatch = useDispatch();

    const panelsInfo = useSelector(mapPanelsInfoSelector);

    const idxOfActiveMapPanel = useSelector(indexOfActiveMapPanelSelector);

    const getPanels = () => {
        const { num } = panelsInfo;

        const panels = [];

        for (let i = 0; i < num; i++) {
            panels.push(
                <div
                    className="flex-grow relative"
                    key={i}
                    onMouseEnter={() => {
                        dispatch(indexOfActiveMapPanelChanged(i));
                    }}
                >
                    <MapPanel isActivePanel={idxOfActiveMapPanel === i} />
                </div>
            );
        }

        return panels;
    };

    return <div className="flex h-screen">{getPanels()}</div>;
};

export default MapPanelsContainer;
