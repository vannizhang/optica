import React from 'react';

type Props = {
    isUnlocked: boolean;
    onClick: () => void;
};

const ZoomLock: React.FC<Props> = ({ isUnlocked, onClick }: Props) => {
    return (
        <div
            className="absolute bg-black text-white z-10 p-1"
            style={{
                bottom: 0,
                right: -27,
            }}
            onClick={onClick}
        >
            {isUnlocked ? 'unlocked' : 'locked'}
        </div>
    );
};

export default ZoomLock;
