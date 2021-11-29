import React from 'react';
// import { MapPanelsDirection } from '../../store/reducers/UI';
// import classnames from 'classnames';

const LockedIcon: JSX.Element = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="fill-current"
    >
        <path d="M12 14h1v1h-1zm-1 6h1v-1h1v-1h-1v-1h1v-1h-1v-1h-1zM6 7a6 6 0 0 1 12 0v3h1.5a1.504 1.504 0 0 1 1.5 1.5v10a1.504 1.504 0 0 1-1.5 1.5h-15A1.504 1.504 0 0 1 3 21.5v-10A1.504 1.504 0 0 1 4.5 10H6zm12 4H4.5a.506.506 0 0 0-.5.5v10a.506.506 0 0 0 .5.5h15a.506.506 0 0 0 .5-.5v-10a.506.506 0 0 0-.5-.5zm-3-4a3 3 0 0 0-6 0v3h6zm-8 3h1V7a4 4 0 0 1 8 0v3h1V7A5 5 0 0 0 7 7z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const UnlockedIcon: JSX.Element = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="fill-current"
    >
        <path d="M1.5 10A1.504 1.504 0 0 0 0 11.5v10A1.504 1.504 0 0 0 1.5 23h15a1.504 1.504 0 0 0 1.5-1.5v-10a1.504 1.504 0 0 0-1.5-1.5H15V6.5c0-2.04 1.346-3.7 3-3.7 1.71 0 3 1.59 3 3.7V8h3V6.5A6.272 6.272 0 0 0 18 0a6.272 6.272 0 0 0-6 6.5V10zM13 6.5A5.274 5.274 0 0 1 18 1a5.274 5.274 0 0 1 5 5.5V7h-1v-.5c0-2.68-1.72-4.7-4-4.7-2.206 0-4 2.108-4 4.7V10h-1zm2 4.5h1.5a.506.506 0 0 1 .5.5v10a.506.506 0 0 1-.5.5h-15a.506.506 0 0 1-.5-.5v-10a.506.506 0 0 1 .5-.5zm-6 9H8v-5h1v1h1v1H9v1h1v1H9zm1-5H9v-1h1z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

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
            className="absolute bg-white text-black opacity-90 z-10 p-2 cursor-pointer flex justify-center"
            style={{
                bottom: -30,
                left: placeOnLeftSide ? 0 : 'calc(100% - 30px)',
                width: 60,
                height: 60,
                borderRadius: '50%',
                boxShadow: '0 0 10px #000',
            }}
            onClick={onClick}
        >
            <div
                className="absolute"
                style={{
                    top: 4,
                }}
            >
                {isUnlocked ? UnlockedIcon : LockedIcon}
            </div>
        </div>
    );
};

export default ZoomLock;
