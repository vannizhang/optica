import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    isControlPanelVisibleSelector,
    isControlPanelVisibleToggled,
} from '../../store/reducers/UI';

const ToggleBtn = () => {
    const dispatch = useDispatch();

    const isVisible = useSelector(isControlPanelVisibleSelector);

    const onClickHandler = () => {
        dispatch(isControlPanelVisibleToggled());
        // console.log('foo')
    };

    if (isVisible) {
        return null;
    }

    return (
        <>
            {/* <div
                className="absolute"
                style={{
                    height: 100,
                    width: 100,
                    top: -50,
                    left: -50,
                    background: 'radial-gradient(circle, rgba(0,0,0,9) 0%, rgba(0,0,0,.1) 75%,  rgba(0,0,0,0) 100%)'
                }}
            >
            </div> */}

            <div
                className="absolute top-2 left-2 p-1 z-10 bg-black bg-opacity-75 hover:bg-opacity-90 text-white cursor-pointer"
                style={{
                    boxShadow: '0 0 1px 1px rgba(0,0,0,.95)',
                }}
                onClick={onClickHandler}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                >
                    <path d="M3 5h18v1H3zm0 8h18v-1H3zm0 7h18v-1H3z" />
                </svg>
            </div>
        </>
    );
};

export default ToggleBtn;
