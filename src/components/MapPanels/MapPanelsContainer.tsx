import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    indexOfActiveMapPanelChanged,
    indexOfActiveMapPanelSelector,
    zoomLevelsSelector,
} from '../../store/reducers/Map';
import { mapPanelsInfoSelector } from '../../store/reducers/UI';
import MapPanel from './MapPanel';

const MapPanelsContainer = () => {
    const dispatch = useDispatch();

    const panelsInfo = useSelector(mapPanelsInfoSelector);

    const idxOfActiveMapPanel = useSelector(indexOfActiveMapPanelSelector);

    // const [ relativeZoomLevels, setRelativeZoomLevels] = useState<number[]>(relativeZoomLevelLookup[0])

    const zoomLevels = useSelector(zoomLevelsSelector);

    const getPanels = () => {
        const { num } = panelsInfo;

        const panels = [];

        for (let i = 0; i < num; i++) {
            const zoom = zoomLevels[i];

            panels.push(
                <div
                    className="flex-grow relative"
                    key={i}
                    onMouseEnter={() => {
                        dispatch(indexOfActiveMapPanelChanged(i));
                    }}
                >
                    <MapPanel
                        index={i}
                        isActivePanel={idxOfActiveMapPanel === i}
                        zoom={zoom}
                    />
                </div>
            );
        }

        return panels;
    };

    // useEffect(()=>{
    //     console.log('idxOfActiveMapPanel', idxOfActiveMapPanel)

    //     if(idxOfActiveMapPanel > -1){
    //         setRelativeZoomLevels(relativeZoomLevelLookup[idxOfActiveMapPanel])
    //     }

    // }, [idxOfActiveMapPanel]);

    return <div className="flex h-screen">{getPanels()}</div>;
};

export default MapPanelsContainer;
