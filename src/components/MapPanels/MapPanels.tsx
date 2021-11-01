import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    MapCenter,
    mapCenterChanged,
    MapCenterSelector,
    webmapIdSelector,
} from '../../store/reducers/Map';
import { MapView } from '../ArcGIS';

type Props = {
    isActivePanel: boolean;
};

const MapPanel: React.FC<Props> = ({ isActivePanel }: Props) => {
    const dispatch = useDispatch();

    const webmapId = useSelector(webmapIdSelector);

    const center = useSelector(MapCenterSelector);

    return (
        <MapView
            webmapId={webmapId}
            center={center}
            isActiveMapPanel={isActivePanel}
            centerOnChange={(center: MapCenter) => {
                dispatch(mapCenterChanged(center));
            }}
            zoomOnChange={(zoom) => {
                console.log(zoom);
            }}
        />
    );
};

export default MapPanel;
