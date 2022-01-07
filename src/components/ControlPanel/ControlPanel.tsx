import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { isControlPanelVisibleToggled } from '../../store/reducers/UI';
import PanelConfiguration from './PanelConfiguration';
import WebMapSelector from './WebMapSelector';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import OAuthControl from './OAuthControl';

const Title = () => {
    return (
        <div className="text-xl">
            <h5>
                {/* Living Atlas{' '} */}
                <span className="font-medium text-white">Optica</span>
            </h5>
        </div>
    );
};

const CloseBtn = () => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(isControlPanelVisibleToggled());
    };

    return (
        <div
            className="absolute top-1 left-1 text-white cursor-pointer"
            onClick={onClickHandler}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                height="32"
                width="32"
                className="fill-current"
            >
                <path d="M23.985 8.722L16.707 16l7.278 7.278-.707.707L16 16.707l-7.278 7.278-.707-.707L15.293 16 8.015 8.722l.707-.707L16 15.293l7.278-7.278z" />
                <path fill="none" d="M0 0h32v32H0z" />
            </svg>
        </div>
    );
};

const ControlPanel = () => {
    const dispatch = useDispatch();

    const containerRef = useRef<HTMLDivElement>();

    const handleClickOutside = () => {
        dispatch(isControlPanelVisibleToggled());
    };

    useOnClickOutside(containerRef, handleClickOutside);

    return (
        <div
            ref={containerRef}
            className="absolute top-0 left-0 right-0 py-2 pb-4 px-14 text-gray-200 z-10 animate-fade-in"
            style={{
                background: `
                    linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 1) 0%,
                        rgba(0, 0, 0, .6) 100%
                    )
                `,
            }}
        >
            <Title />

            <CloseBtn />

            <OAuthControl />

            <div className="md:flex mt-6">
                <PanelConfiguration />
                <WebMapSelector />
            </div>
        </div>
    );
};

export default ControlPanel;
