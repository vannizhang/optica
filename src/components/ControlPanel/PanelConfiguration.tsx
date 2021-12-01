import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MapPanelsDirection,
    mapPanelsInfoChanged,
    mapPanelsInfoSelector,
    updatePanelsLayout,
} from '../../store/reducers/UI';
import classnames from 'classnames';

type PanelIconProps = {
    direction: MapPanelsDirection;
    num: number;
};

const PanelIcon: FC<PanelIconProps> = ({ direction, num }: PanelIconProps) => {
    const dispatch = useDispatch();

    const panelInfo = useSelector(mapPanelsInfoSelector);

    const isSelected =
        panelInfo.direction === direction && panelInfo.num === num;

    const onClickHandler = () => {
        dispatch(updatePanelsLayout({ direction, num }));
    };

    const getRect = () => {
        const rects: JSX.Element[] = [];

        for (let i = 0; i < num; i++) {
            rects.push(
                <div
                    className={classnames('flex-grow', {
                        'bg-gray-50': !isSelected,
                        'bg-white': isSelected,
                    })}
                    style={{
                        margin: 1,
                    }}
                    key={`${direction}-${num}-${i}`}
                ></div>
            );
        }

        return rects;
    };

    const classNames = classnames('cursor-pointer mx-1 mb-2 p-1 flex border', {
        'flex-col': direction === 'vertical',
        'border-gray-50': !isSelected,
        'opacity-50': !isSelected,
        'border-white': isSelected,
    });

    return (
        <div
            className={classNames}
            style={{
                height: 62,
                width: 100,
            }}
            onClick={onClickHandler}
        >
            {getRect()}
        </div>
    );
};

const PanelIconsData: PanelIconProps[] = [
    {
        direction: 'horizontal',
        num: 2,
    },
    {
        direction: 'horizontal',
        num: 3,
    },
    {
        direction: 'vertical',
        num: 2,
    },
    {
        direction: 'vertical',
        num: 3,
    },
];

const PanelConfiguration = () => {
    return (
        <div className="md:border-r border-white border-opacity-30 md:mr-7">
            <h5 className="mb-2">Panel configuration</h5>
            <div className="cursor-pointer flex flex-wrap w-60">
                {PanelIconsData.map(({ direction, num }) => {
                    return (
                        <PanelIcon
                            key={`${direction}-${num}`}
                            direction={direction}
                            num={num}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PanelConfiguration;
