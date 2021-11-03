import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    MapCenter,
    mapCenterChanged,
    MapCenterSelector,
    webmapIdSelector,
    updateZoomLevels,
} from '../../store/reducers/Map';
import { MapView } from '../ArcGIS';

type Props = {
    isActivePanel: boolean;
    zoom: number;
    index: number;
};

const MapPanel: React.FC<Props> = ({ isActivePanel, zoom, index }: Props) => {
    const dispatch = useDispatch();

    const webmapId = useSelector(webmapIdSelector);

    const center = useSelector(MapCenterSelector);

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
                if (newZoom === zoom) {
                    return;
                }

                dispatch(updateZoomLevels(newZoom, index));
            }}
        />
    );
};

export default MapPanel;
