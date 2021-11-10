import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';

import IMapView from 'esri/views/MapView';
import IPoint from 'esri/geometry/Point';
import { loadModules } from 'esri-loader';
import { useSelector } from 'react-redux';
import {
    relativeZoomLevelsSelector,
    zoomLevelsSelector,
} from '../../store/reducers/Map';
import { usePrevious } from '../../hooks/usePrevious';

type IExtent = {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    spatialReference: any;
};

type Props = {
    extent: IExtent;
    mapView?: IMapView;
};

type BoxPosition = {
    top: number;
    left: number;
    height: number;
    width: number;
};

const ExtentBox: FC<Props> = ({ extent, mapView }: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    const relativeZoomLevels = useSelector(relativeZoomLevelsSelector);

    // const zoomLevels = useSelector(zoomLevelsSelector)

    const [pos, setPos] = useState<BoxPosition>();

    const calcPos = async () => {
        type Modules = [typeof IPoint];

        console.log('calling calcPos', extent);

        if (!extent) {
            setPos(null);
            return;
        }

        const { xmin, ymin, xmax, ymax, spatialReference } = extent;

        try {
            const [Point] = await (loadModules([
                'esri/geometry/Point',
            ]) as Promise<Modules>);

            const pointMin: IPoint = new Point({
                x: xmin,
                y: ymin,
                spatialReference,
            });

            const pointMax: IPoint = new Point({
                x: xmax,
                y: ymax,
                spatialReference,
            });

            const screenPointMin = mapView.toScreen(pointMin);
            const screenPointMax = mapView.toScreen(pointMax);

            setPos({
                left: screenPointMin.x,
                top: screenPointMax.y,
                width: Math.abs(screenPointMax.x - screenPointMin.x),
                height: Math.abs(screenPointMax.y - screenPointMin.y),
            });

            // console.log(screenPointMin, screenPointMax)
        } catch (err) {}
    };

    useEffect(() => {
        calcPos();
    }, [relativeZoomLevels]);

    const getStyle = (): CSSProperties => {
        const { top, left, height, width } = pos;

        if (top < 0 || left < 0) {
            return {
                display: 'none',
            };
        }

        return {
            top,
            left,
            height,
            width,
            display: 'block',
        };
    };

    if (!mapView || !pos) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className="absolute border-2 border-red-500 pointer-events-none"
            style={getStyle()}
        ></div>
    );
};

export default ExtentBox;
