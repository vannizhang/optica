import React, { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    WEB_MAP_ID_HUMAN_GEO_DARK,
    WEB_MAP_ID_HUMAN_GEO_LIGHT,
    WEB_MAP_ID_HYBRID,
    WEB_MAP_ID_IMAGERY,
    WEB_MAP_ID_TOPO,
    WEB_MAP_ID_VIBRANT,
} from '../../constants/map';
import {
    isInvalidWebmapIdSelector,
    updateWebmapId,
    webmapIdChanged,
    webmapIdSelector,
    webmapRequestErrorSelector,
} from '../../store/reducers/Map';

import imagery_thumbnail from '../../static/imagery.jpg';
import hybrid_thumbnail from '../../static/hybrid.jpg';
import human_geo_light_thumbnail from '../../static/human-geo-light.jpg';
import human_dark_light_thumbnail from '../../static/human-geo-dark.jpg';
import topo_thumbnail from '../../static/topo.jpg';
import vibrant_thumbnail from '../../static/vibrant.png';
import classnames from 'classnames';
import { decodeQueryString } from '@esri/arcgis-rest-request';
import { EsriOAuthContext } from '../../contexts/EsriOAuthProvider';
import { webMercatorToGeographic } from 'esri/geometry/support/webMercatorUtils';

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

const getItemId = (url: string) => {
    if (url.indexOf('?') === -1) {
        return url;
    }

    const [path, search] = url.split('?');

    const param = decodeQueryString(search);

    return param.webmap || param.id || '';
};

const WebMapIdTextInput = () => {
    const dispatch = useDispatch();

    const [val, setVal] = useState<string>('');

    const { credential, signIn } = useContext(EsriOAuthContext);

    const isInvalidWebmapId = useSelector(isInvalidWebmapIdSelector);

    const webmapRequestError = useSelector(webmapRequestErrorSelector);

    const getHeaderText = () => {
        if (isInvalidWebmapId || webmapRequestError) {
            return 'Invalid Item Id';
        }

        return 'Any ArcGIS Online 2D Web Map';
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVal(event.target.value);
    };

    const onClickHandler = () => {
        const itemId = getItemId(val);

        dispatch(updateWebmapId(itemId));
    };

    useEffect(() => {
        // sign in if get "You do not have permissions to access this resource" error
        if (
            webmapRequestError &&
            webmapRequestError.code === 'GWM_0003' &&
            !credential
        ) {
            signIn();
        }
    }, [webmapRequestError]);

    return (
        <div className="pb-2">
            <h5 className="text-sm text-gray-200 mb-1">{getHeaderText()}</h5>

            <div className="flex items-stretch">
                <input
                    type="text"
                    placeholder="Web Map link or Item Id"
                    className="bg-transparent border border-r-0 border-gray-500 p-2 placeholder-opacity-50 text-sm"
                    value={val}
                    onChange={handleChange}
                />

                <div
                    className={classnames(
                        'flex justify-center items-center w-10 border border-gray-500',
                        {
                            'text-gray-700': val === '',
                            'text-gray-200': val !== '',
                            'cursor-pointer': val !== '',
                            'pointer-events-none': val === '',
                        }
                    )}
                    onClick={onClickHandler}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                    >
                        <path d="M6 1.773l15 10.23L6 22.226z" />
                        <path fill="none" d="M0 0h24v24H0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

const WebMapSelector = () => {
    const dispatch = useDispatch();

    const onChangeHandler = (id: string) => {
        dispatch(updateWebmapId(id));
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
            <div className="md:flex">
                <div className="flex">
                    {groups.map((elements, idx) => {
                        return (
                            <div key={idx} className="mr-4">
                                {elements}
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-end mt-2 md:mt-0 md:ml-2">
                    <WebMapIdTextInput />
                </div>
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
