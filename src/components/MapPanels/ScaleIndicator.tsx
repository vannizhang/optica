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
            className="absolute top-0 left-0 right-0 py-1 text-white text-center italic text-sm font-medium"
            style={{
                background: `
                    linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 1) 0%,
                        rgba(0, 0, 0, .1) 80%,
                        rgba(0, 0, 0, 0) 100%)
                    `,
                textShadow: `0px 0px 6px black`,
            }}
        >
            1:{numberFns.numberWithCommas(+scale.toFixed())}
        </div>
    );

    // return null;
};

export default ScaleIndicator;
