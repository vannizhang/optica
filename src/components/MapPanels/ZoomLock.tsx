import React from 'react';
// import { MapPanelsDirection } from '../../store/reducers/UI';
// import classnames from 'classnames';

const LockedIcon: JSX.Element = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27.83"
        height="28.13"
        viewBox="0 0 27.83 28.13"
        className="fill-current"
    >
        <path d="M16.91,0A10.92,10.92,0,1,0,27.83,10.92,10.92,10.92,0,0,0,16.91,0Zm-.09,19.39a8.47,8.47,0,1,1,8.47-8.47A8.47,8.47,0,0,1,16.82,19.39Z" />
        <rect
            id="Handle"
            x="2.63"
            y="17.73"
            width="4.07"
            height="11.46"
            rx="1.99"
            transform="translate(17.96 3.57) rotate(45)"
        />
        <path
            id="Lock_Base"
            data-name="Lock Base"
            d="M20.16,9.8h-6.5a1.1,1.1,0,0,0-1.1,1.1v4a1.1,1.1,0,0,0,1.1,1.1h6.5a1.11,1.11,0,0,0,1.11-1.1v-4A1.11,1.11,0,0,0,20.16,9.8ZM17,14.5a1.22,1.22,0,1,1,1.23-1.22A1.22,1.22,0,0,1,17,14.5Z"
        />
        <path d="M16.82,5.86a3.52,3.52,0,0,0-3.51,3.52c0,1.94,1.7,2.68,3.64,2.68s3.39-.74,3.39-2.68A3.53,3.53,0,0,0,16.82,5.86Zm0,5.67A2.15,2.15,0,1,1,19,9.38,2.16,2.16,0,0,1,16.82,11.53Z" />
    </svg>
);

const UnlockedIcon: JSX.Element = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27.83"
        height="28.13"
        viewBox="0 0 27.83 28.13"
        className="fill-current"
    >
        <path d="M16.91,0A10.92,10.92,0,1,0,27.83,10.92,10.92,10.92,0,0,0,16.91,0Zm-.09,19.39a8.47,8.47,0,1,1,8.47-8.47A8.47,8.47,0,0,1,16.82,19.39Z" />
        <rect
            id="Handle"
            x="2.63"
            y="17.73"
            width="4.07"
            height="11.46"
            rx="1.99"
            transform="translate(17.96 3.57) rotate(45)"
        />
        <path
            id="Lock_Base"
            data-name="Lock Base"
            d="M20.16,9.8h-6.5a1.1,1.1,0,0,0-1.1,1.1v4a1.1,1.1,0,0,0,1.1,1.1h6.5a1.11,1.11,0,0,0,1.11-1.1v-4A1.11,1.11,0,0,0,20.16,9.8ZM17,14.5a1.22,1.22,0,1,1,1.23-1.22A1.22,1.22,0,0,1,17,14.5Z"
        />
        <path d="M16.82,3.86a3.52,3.52,0,0,0-3.51,3.52h1.36a2.15,2.15,0,1,1,4.3,0v4.33c1.36,0,1.36.56,1.36-4.33A3.53,3.53,0,0,0,16.82,3.86Z" />
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
            className="absolute bg-black text-white z-10 p-2"
            style={{
                bottom: 0,
                left: placeOnLeftSide ? 0 : 'calc(100% - 22px)',
            }}
            onClick={onClick}
        >
            {isUnlocked ? UnlockedIcon : LockedIcon}
        </div>
    );
};

export default ZoomLock;
