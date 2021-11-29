import React from 'react';

import { numberFns } from 'helper-toolkit-ts';

type Props = {
    scale?: number;
};

const ScaleIndicator: React.FC<Props> = ({ scale }: Props) => {
    if (scale === 0) {
        return null;
    }

    return (
        <div
            className="absolute bottom-0 left-0 right-0 py-1 text-white text-center text-sm font-medium"
            style={{
                background: `
                    linear-gradient(
                        to top,
                        rgba(0, 0, 0, 1) 0%,
                        rgba(0, 0, 0, .25) 80%,
                        rgba(0, 0, 0, 0) 100%)
                    `,
            }}
        >
            1:{numberFns.numberWithCommas(+scale.toFixed())}
        </div>
    );
};

export default ScaleIndicator;
