import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import './ExtentBox.css';

import IMapView from 'esri/views/MapView';
import IPoint from 'esri/geometry/Point';
import { loadModules } from 'esri-loader';
import { useSelector } from 'react-redux';
import {
    extentsSelector,
    // relativeZoomLevelsSelector,
    // zoomLevelsSelector,
} from '../../store/reducers/Map';
// import { usePrevious } from '../../hooks/usePrevious';
import IwatchUtils from 'esri/core/watchUtils';
import classnames from 'classnames';
import { mapPanelsInfoSelector } from '../../store/reducers/UI';

type IExtent = {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    spatialReference: any;
};

type Props = {
    // extent: IExtent;
    indexOfTargetMap: number;
    indexOfContainerMap: number;
    mapView?: IMapView;
};

type BoxPosition = {
    top: number;
    left: number;
    height: number;
    width: number;
};

const ExtentBox: FC<Props> = ({
    // extent,
    indexOfTargetMap,
    indexOfContainerMap,
    mapView,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    const extents = useSelector(extentsSelector);

    // const relativeZoomLevels = useSelector(relativeZoomLevelsSelector);

    const { direction } = useSelector(mapPanelsInfoSelector);

    const extentOfTargetMapRef = useRef<string>();

    const prevZoomRef = useRef<number>();

    const [pos, setPos] = useState<BoxPosition>();

    const calcPos = async (extentString: string) => {
        type Modules = [typeof IPoint];

        const extent: IExtent = extentString ? JSON.parse(extentString) : null;

        // console.log('calling calcPos', extent);

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

    const addWatchEvent = async (mapView: IMapView) => {
        type Modules = [typeof IwatchUtils];

        try {
            const [watchUtils] = await (loadModules([
                'esri/core/watchUtils',
            ]) as Promise<Modules>);

            watchUtils.whenTrue(mapView, 'stationary', () => {
                if (prevZoomRef.current !== mapView.zoom) {
                    calcPos(extentOfTargetMapRef.current);
                }

                prevZoomRef.current = mapView.zoom;
            });
        } catch (err) {
            console.error(err);
        }
    };

    // useEffect(() => {
    //     // console.log(zoomLevels)
    // }, [zoomLevels]);

    useEffect(() => {
        if (mapView) {
            addWatchEvent(mapView);
        }
    }, [mapView]);

    useEffect(() => {
        if (extentOfTargetMapRef.current === extents[indexOfTargetMap]) {
            return;
        }

        // check if the extent change is triggered by center change
        if (extentOfTargetMapRef.current) {
            // current extent
            const ext1 = JSON.parse(extentOfTargetMapRef.current) as IExtent;
            // new extent
            const ext2 = JSON.parse(extents[indexOfTargetMap]) as IExtent;

            const diffX1 = Math.floor(Math.abs(ext1.xmin - ext1.xmax));
            const diffY1 = Math.floor(Math.abs(ext1.ymin - ext1.ymax));

            const diffX2 = Math.floor(Math.abs(ext2.xmin - ext2.xmax));
            const diffY2 = Math.floor(Math.abs(ext2.ymin - ext2.ymax));

            if (diffX1 === diffX2 && diffY1 === diffY2) {
                return;
            }
        }

        extentOfTargetMapRef.current = extents[indexOfTargetMap];

        calcPos(extentOfTargetMapRef.current);
    }, [extents]);

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
            boxShadow: '0 0 5px 2px rgba(0,0,0,.75)',
        };
    };

    if (!mapView || !pos) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className={classnames(
                'absolute border border-white border-opacity-50 pointer-events-none',
                {
                    'arrow-horizontal': direction === 'horizontal',
                    'arrow-vertical': direction === 'vertical',
                    'to-left': indexOfTargetMap < indexOfContainerMap,
                    'to-right': indexOfTargetMap > indexOfContainerMap,
                    'to-top': indexOfTargetMap < indexOfContainerMap,
                    'to-bottom': indexOfTargetMap > indexOfContainerMap,
                }
            )}
            style={getStyle()}
        ></div>
    );
};

export default ExtentBox;
