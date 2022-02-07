import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    indexOfActiveMapPanelChanged,
    indexOfActiveMapPanelSelector,
    relativeZoomLevelsSelector,
    scalesSelector,
    toggleLockRelativeZoomLevels,
    zoomLevelsSelector,
} from '../../store/reducers/Map';
import { mapPanelsInfoSelector } from '../../store/reducers/UI';
import MapPanel from './MapPanel';
import classnames from 'classnames';
import ZoomLock from './ZoomLock';
import ScaleIndicator from './ScaleIndicator';

const MapPanelsContainer = () => {
    const dispatch = useDispatch();

    const { num, direction } = useSelector(mapPanelsInfoSelector);

    const isHorizontal = direction === 'horizontal';

    const idxOfActiveMapPanel = useSelector(indexOfActiveMapPanelSelector);

    // const [ relativeZoomLevels, setRelativeZoomLevels] = useState<number[]>(relativeZoomLevelLookup[0])

    const zoomLevels = useSelector(zoomLevelsSelector);

    const scales = useSelector(scalesSelector);

    const relativeZoomLevels = useSelector(relativeZoomLevelsSelector);

    const getPanels = () => {
        // const { num } = panelsInfo;

        const panels = [];

        for (let i = 0; i < num; i++) {
            const zoom = zoomLevels[i];

            const shouldShowZoomLock = i < num - 1;

            const shouldShowBorder = i === 1;

            const classNames = classnames('relative', {
                'h-1/2': !isHorizontal && num === 2,
                'h-1/3': !isHorizontal && num === 3,
                'w-1/2': isHorizontal && num === 2,
                'w-1/3': isHorizontal && num === 3,
                'border-l': shouldShowBorder && direction === 'horizontal',
                'border-r':
                    shouldShowBorder && direction === 'horizontal' && num > 2,
                'border-t': shouldShowBorder && direction === 'vertical',
                'border-b':
                    shouldShowBorder && direction === 'vertical' && num > 2,
                'border-white border-opacity-50': shouldShowBorder,
            });

            panels.push(
                <div
                    className={classNames}
                    key={i}
                    onMouseEnter={() => {
                        dispatch(indexOfActiveMapPanelChanged(i));
                    }}
                    // style={{
                    //     'boxShadow': '-2px 0 5px 5px rgba(0,0,0,.75)'
                    // }}
                >
                    <MapPanel
                        index={i}
                        isActivePanel={idxOfActiveMapPanel === i}
                        zoom={zoom}
                        shouldHideAttribution={i < num - 1}
                    />

                    <ScaleIndicator scale={scales[i]} />

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
            className={classnames('flex h-screen overflow-hidden', {
                'flex-col': !isHorizontal,
            })}
        >
            {getPanels()}
        </div>
    );
};

export default MapPanelsContainer;
