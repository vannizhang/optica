import React from 'react';
import { useDispatch } from 'react-redux';
import { WEB_MAPS } from '../../constants/map';
import { webmapIdChanged } from '../../store/reducers/Map';

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
        <div className="">
            <h5>Map</h5>
            {getOptions()}
        </div>
    );
};

export default WebMapSelector;
