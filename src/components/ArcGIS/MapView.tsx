import React, { useEffect, useRef } from 'react';

import { loadModules, loadCss } from 'esri-loader';
import IMapView from 'esri/views/MapView';
import IWebMap from 'esri/WebMap';
import IPoint from 'esri/geometry/Point';
import IwatchUtils from 'esri/core/watchUtils';
import { MapCenter } from '../../store/reducers/Map';

loadCss();

interface Props {
    webmapId: string;
    center: MapCenter;
    zoom: number;
    isActiveMapPanel: boolean;
    centerOnChange: (center: MapCenter) => void;
    zoomOnChange: (zoom: number) => void;
    children?: React.ReactNode;
}

const MapView: React.FC<Props> = ({
    webmapId,
    center,
    zoom,
    isActiveMapPanel,
    centerOnChange,
    zoomOnChange,
    children,
}: Props) => {
    const mapDivRef = React.useRef<HTMLDivElement>();

    const isActiveMapRef = useRef<boolean>(isActiveMapPanel);

    const [mapView, setMapView] = React.useState<IMapView>(null);

    const initMapView = async () => {
        type Modules = [typeof IMapView, typeof IWebMap];

        try {
            const [MapView, WebMap] = await (loadModules([
                'esri/views/MapView',
                'esri/WebMap',
            ]) as Promise<Modules>);

            const { lon, lat } = center;

            const view = new MapView({
                container: mapDivRef.current,
                map: new WebMap({
                    portalItem: {
                        id: webmapId,
                    },
                }),
                zoom,
                center: [lon, lat],
            });

            view.when(() => {
                setMapView(view);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const addWatchEvent = async () => {
        type Modules = [typeof IwatchUtils];

        try {
            const [watchUtils] = await (loadModules([
                'esri/core/watchUtils',
            ]) as Promise<Modules>);

            watchUtils.watch(mapView, 'center', (center: IPoint) => {
                // console.log('map center on change', center)
                const { longitude, latitude } = center;

                if (isActiveMapRef.current) {
                    centerOnChange({
                        lon: longitude,
                        lat: latitude,
                    });
                }
            });

            watchUtils.whenTrue(mapView, 'stationary', () => {
                // console.log('mapview is stationary', mapView.zoom);

                if (mapView.zoom === -1) {
                    return;
                }

                if (isActiveMapRef.current) {
                    zoomOnChange(mapView.zoom);
                }

                // console.log(mapView.scale)

                // const centerLocation = {
                //     lat:
                //         mapView.center && mapView.center.latitude
                //             ? +mapView.center.latitude.toFixed(3)
                //             : 0,
                //     lon:
                //         mapView.center && mapView.center.longitude
                //             ? +mapView.center.longitude.toFixed(3)
                //             : 0,
                //     zoom: mapView.zoom,
                // };

                // updateMapLocation(centerLocation);
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        initMapView();
    }, []);

    useEffect(() => {
        if (mapView) {
            addWatchEvent();
        }
    }, [mapView]);

    useEffect(() => {
        if (!mapView || isActiveMapPanel) {
            return;
        }

        const { lon, lat } = center;

        mapView.goTo(
            {
                center: [lon, lat],
            },
            {
                duration: 100,
            }
        );
    }, [center, mapView]);

    useEffect(() => {
        if (!mapView) {
            return;
        }

        if (mapView.zoom === zoom) {
            return;
        }

        mapView.goTo({
            zoom,
        });
    }, [zoom]);

    useEffect(() => {
        isActiveMapRef.current = isActiveMapPanel;
    }, [isActiveMapPanel]);

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
                ref={mapDivRef}
            ></div>
            {mapView
                ? React.Children.map(children, (child) => {
                      return React.cloneElement(
                          child as React.ReactElement<any>,
                          {
                              mapView,
                          }
                      );
                  })
                : null}
        </>
    );
};

export default MapView;
