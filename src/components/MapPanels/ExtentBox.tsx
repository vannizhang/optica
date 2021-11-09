import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';

import IMapView from 'esri/views/MapView';
import IPoint from 'esri/geometry/Point';
import { loadModules } from 'esri-loader';

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

    const [pos, setPos] = useState<BoxPosition>();

    const calcPos = async () => {
        type Modules = [typeof IPoint];

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

            if (
                screenPointMin.x < 0 ||
                screenPointMin.y < 0 ||
                screenPointMax.x < 0 ||
                screenPointMax.y < 0
            ) {
                setPos(null);
                return;
            }

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
        if (mapView && extent) {
            calcPos();
            // console.log('extent changed', extent)
        }
    }, [extent]);

    if (!mapView || !pos) {
        return null;
    }

    const { top, left, height, width } = pos;

    return (
        <div
            ref={containerRef}
            className="absolute border-2 border-red-500 pointer-events-none"
            style={{
                top,
                left,
                height,
                width,
            }}
        ></div>
    );
};

export default ExtentBox;
