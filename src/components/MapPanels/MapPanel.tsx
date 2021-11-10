import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    MapCenter,
    mapCenterChanged,
    MapCenterSelector,
    webmapIdSelector,
    updateZoomLevels,
    updateExtents,
    extentsSelector,
} from '../../store/reducers/Map';
import { mapPanelsInfoSelector } from '../../store/reducers/UI';
import { MapView } from '../ArcGIS';
import ExtentBox from './ExtentBox';

type Props = {
    isActivePanel: boolean;
    zoom: number;
    index: number;
};

const MapPanel: React.FC<Props> = ({ isActivePanel, zoom, index }: Props) => {
    const dispatch = useDispatch();

    const webmapId = useSelector(webmapIdSelector);

    const center = useSelector(MapCenterSelector);

    const extents = useSelector(extentsSelector);

    const panelInfo = useSelector(mapPanelsInfoSelector);

    const getExtentBoxes = () => {
        const extentBoxes: JSX.Element[] = [];

        for (let i = index - 1; i <= index + 1; i++) {
            if (i === index || i === panelInfo.num) {
                continue;
            }

            if (extents[i]) {
                const extent = JSON.parse(extents[i]);

                extentBoxes.push(
                    <ExtentBox key={extents[i] + i} extent={extent} />
                );
            }
        }

        return extentBoxes;
    };

    return (
        <MapView
            webmapId={webmapId}
            center={center}
            zoom={zoom}
            isActiveMapPanel={isActivePanel}
            centerOnChange={(center: MapCenter) => {
                dispatch(mapCenterChanged(center));
            }}
            zoomOnChange={(newZoom) => {
                dispatch(updateZoomLevels(newZoom, index));
            }}
            extentOnChange={(extent) => {
                // console.log('extent on change', extent)
                dispatch(updateExtents(extent, index));
            }}
        >
            {getExtentBoxes()}
        </MapView>
    );
};

export default MapPanel;
