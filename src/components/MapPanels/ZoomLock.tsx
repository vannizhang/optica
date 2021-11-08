import React from 'react';
import { MapPanelsDirection } from '../../store/reducers/UI';
import classnames from 'classnames';

type Props = {
    placeOnLeftSide: boolean;
    isUnlocked: boolean;
    onClick: () => void;
};

const ZoomLock: React.FC<Props> = ({
    placeOnLeftSide,
    isUnlocked,
    onClick,
}: Props) => {
    return (
        <div
            className="absolute bg-black text-white z-10 p-1"
            style={{
                bottom: 0,
                left: placeOnLeftSide ? 0 : 'calc(100% - 35px)',
            }}
            onClick={onClick}
        >
            {isUnlocked ? 'unlocked' : 'locked'}
        </div>
    );
};

export default ZoomLock;
