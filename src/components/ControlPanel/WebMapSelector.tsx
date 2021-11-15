import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    WEB_MAP_ID_HUMAN_GEO_DARK,
    WEB_MAP_ID_HUMAN_GEO_LIGHT,
    WEB_MAP_ID_HYBRID,
    WEB_MAP_ID_IMAGERY,
    WEB_MAP_ID_TOPO,
    WEB_MAP_ID_VIBRANT,
} from '../../constants/map';
import { webmapIdChanged, webmapIdSelector } from '../../store/reducers/Map';

import imagery_thumbnail from '../../static/imagery.jpg';
import hybrid_thumbnail from '../../static/hybrid.jpg';
import human_geo_light_thumbnail from '../../static/human-geo-light.jpg';
import human_dark_light_thumbnail from '../../static/human-geo-dark.jpg';
import topo_thumbnail from '../../static/topo.jpg';
import vibrant_thumbnail from '../../static/vibrant.png';
import classnames from 'classnames';

type WebMapInfo = {
    title: string;
    id: string;
    thumbnail: any;
};

export const WEB_MAPS: WebMapInfo[] = [
    {
        title: 'Imagery With Label',
        id: WEB_MAP_ID_HYBRID,
        thumbnail: hybrid_thumbnail,
    },
    {
        title: 'Imagery',
        id: WEB_MAP_ID_IMAGERY,
        thumbnail: imagery_thumbnail,
    },
    {
        title: 'Human Geo Light',
        id: WEB_MAP_ID_HUMAN_GEO_LIGHT,
        thumbnail: human_geo_light_thumbnail,
    },
    {
        title: 'Human Geo Dark',
        id: WEB_MAP_ID_HUMAN_GEO_DARK,
        thumbnail: human_dark_light_thumbnail,
    },
    {
        title: 'Terrain',
        id: WEB_MAP_ID_TOPO,
        thumbnail: topo_thumbnail,
    },
    {
        title: 'Vibrant',
        id: WEB_MAP_ID_VIBRANT,
        thumbnail: vibrant_thumbnail,
    },
];

type PropsWebMapOption = {
    data: WebMapInfo;
    isActive: boolean;
    onClick: (id: string) => void;
};

const WebMapOption: FC<PropsWebMapOption> = ({
    data,
    isActive,
    onClick,
}: PropsWebMapOption) => {
    const { title, id, thumbnail } = data;

    return (
        <div key={id} className="flex items-center mb-2">
            <div
                className={classnames('cursor-pointer border', {
                    'border-white': isActive,
                    'border-gray-50': !isActive,
                    'opacity-60': !isActive,
                })}
                onClick={onClick.bind(null, id)}
                style={{
                    height: 62,
                    width: 62,
                    background: `url(${thumbnail}) center center`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            ></div>

            <div className="ml-3">
                <span className="text-sm">{title}</span>
            </div>
        </div>
    );
};

const WebMapSelector = () => {
    const dispatch = useDispatch();

    const onChangeHandler = (id: string) => {
        dispatch(webmapIdChanged(id));
    };

    const activeWebmapId = useSelector(webmapIdSelector);

    const groups: JSX.Element[][] = [];

    const getOptions = () => {
        WEB_MAPS.forEach((data, index) => {
            const groupIdx = Math.floor(index / 2);

            groups[groupIdx] = groups[groupIdx] || [];

            groups[groupIdx].push(
                <WebMapOption
                    key={data.id}
                    data={data}
                    isActive={data.id === activeWebmapId}
                    onClick={onChangeHandler}
                />
            );
        });

        return (
            <div className="flex">
                {groups.map((elements, idx) => {
                    return (
                        <div key={idx} className="mr-4">
                            {elements}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="">
            <h5 className="mb-2">Map</h5>
            {getOptions()}
        </div>
    );
};

export default WebMapSelector;
