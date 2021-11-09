import React from 'react';
import { useDispatch } from 'react-redux';
import { WEB_MAPS } from '../../constants/map';
import { webmapIdChanged } from '../../store/reducers/Map';
import {
    MapPanelsDirection,
    MapPanelsInfo,
    mapPanelsInfoChanged,
} from '../../store/reducers/UI';

const PanelConfiguration = () => {
    const dispatch = useDispatch();

    const onChangeHandler = (direction: MapPanelsDirection, num: number) => {
        dispatch(mapPanelsInfoChanged({ direction, num }));
    };

    return (
        <div>
            <h5>Panel configuration</h5>
            <ul className="cursor-pointer">
                <li onClick={onChangeHandler.bind(undefined, 'horizontal', 2)}>
                    horizontal-2
                </li>
                <li onClick={onChangeHandler.bind(undefined, 'horizontal', 3)}>
                    horizontal-3
                </li>
                <li onClick={onChangeHandler.bind(undefined, 'vertical', 2)}>
                    vertical-2
                </li>
                <li onClick={onChangeHandler.bind(undefined, 'vertical', 3)}>
                    vertical-3
                </li>
            </ul>
        </div>
    );
};

const WebMapSelector = () => {
    const dispatch = useDispatch();

    const onChangeHandler = (id: string) => {
        dispatch(webmapIdChanged(id));
    };

    const getOptions = () => {
        return WEB_MAPS.map(({ title, id }) => {
            return (
                <div
                    key={id}
                    className="cursor-pointer"
                    onClick={onChangeHandler.bind(null, id)}
                >
                    {title}
                </div>
            );
        });
    };

    return (
        <div className="ml-4">
            <h5>Map</h5>
            {getOptions()}
        </div>
    );
};

const ControlPanel = () => {
    return (
        <div className="absolute top-0 left-0 right-0 py-4 px-10 bg-black text-white z-10 flex">
            <PanelConfiguration />
            <WebMapSelector />
        </div>
    );
};

export default ControlPanel;
