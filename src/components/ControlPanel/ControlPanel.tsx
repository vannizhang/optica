import React from 'react';
import { useDispatch } from 'react-redux';
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

const ControlPanel = () => {
    return (
        <div className="absolute top-0 left-0 right-0 py-4 px-10 bg-black text-white z-10">
            <PanelConfiguration />
        </div>
    );
};

export default ControlPanel;
