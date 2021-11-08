import React from 'react';
import { useDispatch } from 'react-redux';
import { isControlPanelVisibleToggled } from '../../store/reducers/UI';

const ToggleBtn = () => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(isControlPanelVisibleToggled());
        // console.log('foo')
    };

    return (
        <div
            className="absolute top-1 left-0 z-10 bg-black text-white cursor-pointer"
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
    );
};

export default ToggleBtn;
