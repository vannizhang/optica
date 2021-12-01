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
                className="absolute top-0 left-0 p-1 z-10 bg-black text-white cursor-pointer"
                onClick={onClickHandler}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                    viewBox="0 0 32 32"
                    height="32"
                    width="32"
                >
                    <path d="M28 7H4V6h24zm0 9H4v1h24zm0 10H4v1h24z" />
                    <path fill="none" d="M0 0h32v32H0z" />
                </svg>
            </div>
        </>
    );
};

export default ToggleBtn;
