import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    indexOfActiveMapPanelChanged,
    indexOfActiveMapPanelSelector,
    relativeZoomLevelsSelector,
    toggleLockRelativeZoomLevels,
    zoomLevelsSelector,
} from '../../store/reducers/Map';
import { mapPanelsInfoSelector } from '../../store/reducers/UI';
import MapPanel from './MapPanel';
import classnames from 'classnames';
import ZoomLock from './ZoomLock';

const MapPanelsContainer = () => {
    const dispatch = useDispatch();

    const { num, direction } = useSelector(mapPanelsInfoSelector);

    const isHorizontal = direction === 'horizontal';

    const idxOfActiveMapPanel = useSelector(indexOfActiveMapPanelSelector);

    // const [ relativeZoomLevels, setRelativeZoomLevels] = useState<number[]>(relativeZoomLevelLookup[0])

    const zoomLevels = useSelector(zoomLevelsSelector);

    const relativeZoomLevels = useSelector(relativeZoomLevelsSelector);

    const getPanels = () => {
        // const { num } = panelsInfo;

        const panels = [];

        for (let i = 0; i < num; i++) {
            const zoom = zoomLevels[i];

            const shouldShowZoomLock = i < num - 1;

            const classNames = classnames('relative', {
                'h-1/2': !isHorizontal && num === 2,
                'h-1/3': !isHorizontal && num === 3,
                'w-1/2': isHorizontal && num === 2,
                'w-1/3': isHorizontal && num === 3,
            });

            panels.push(
                <div
                    className={classNames}
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

                    {shouldShowZoomLock && (
                        <ZoomLock
                            placeOnLeftSide={direction === 'vertical'}
                            isUnlocked={
                                relativeZoomLevels[i] === null ||
                                relativeZoomLevels[i + 1] === null
                            }
                            onClick={() => {
                                // console.log(i)
                                dispatch(toggleLockRelativeZoomLevels(i));
                            }}
                        />
                    )}
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

    return (
        <div
            className={classnames('flex h-screen', {
                'flex-col': !isHorizontal,
            })}
        >
            {getPanels()}
        </div>
    );
};

export default MapPanelsContainer;
