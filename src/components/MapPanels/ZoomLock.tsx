import React from 'react';
// import { MapPanelsDirection } from '../../store/reducers/UI';
// import classnames from 'classnames';

const LockedIcon: JSX.Element = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        className="fill-current"
    >
        <path d="M8 1a4.012 4.012 0 0 0-4 4v2H3a1.003 1.003 0 0 0-1 1v7a1.003 1.003 0 0 0 1 1h10a1.003 1.003 0 0 0 1-1V8a1.003 1.003 0 0 0-1-1h-1V5a4.012 4.012 0 0 0-4-4zM5 5a3 3 0 0 1 6 0v2h-1V5a2 2 0 0 0-4 0v2H5zm4 2H7V5a1 1 0 0 1 2 0zm4 1v7H3V8zm-5 2h1v1H8v1h1v1H8v1H7V9h1z" />
    </svg>
);

const UnlockedIcon: JSX.Element = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        className="fill-current"
    >
        <path d="M16 6V4a4 4 0 1 0-8 0v3H2a1.003 1.003 0 0 0-1 1v7a1.003 1.003 0 0 0 1 1h10a1.003 1.003 0 0 0 1-1V8a1.003 1.003 0 0 0-1-1h-1V4a1 1 0 0 1 2 0v2zm-4 2v7H2V8zm0-6a2 2 0 0 0-2 2v3H9V4a3 3 0 1 1 6 0v1h-1V4a2 2 0 0 0-2-2zM7 14H6V9h1v1h1v1H7v1h1v1H7z" />
    </svg>
);

type Props = {
    placeOnLeftSide: boolean;
    isUnlocked: boolean;
    onClick: () => void;
};

const SIZE = 40;

const ZoomLock: React.FC<Props> = ({
    placeOnLeftSide,
    isUnlocked,
    onClick,
}: Props) => {
    return (
        <div
            className="absolute bg-white text-black opacity-90 z-10 p-2 cursor-pointer flex"
            style={{
                bottom: -(SIZE / 2),
                left: placeOnLeftSide
                    ? -(SIZE / 2)
                    : `calc(100% - ${SIZE / 2}px)`,
                justifyContent: placeOnLeftSide ? 'flex-end' : 'center',
                alignItems: placeOnLeftSide ? 'center' : 'flex-start',
                width: SIZE,
                height: SIZE,
                borderRadius: '50%',
                boxShadow: '0 0 10px #000',
            }}
            onClick={onClick}
        >
            <div
                className="absolute"
                style={{
                    top: placeOnLeftSide ? 'unset' : 2,
                    right: placeOnLeftSide ? 2 : 'unset',
                }}
            >
                {isUnlocked ? UnlockedIcon : LockedIcon}
            </div>
        </div>
    );
};

export default ZoomLock;
