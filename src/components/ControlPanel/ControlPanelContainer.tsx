import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ControlPanel from './ControlPanel';
import { isControlPanelVisibleSelector } from '../../store/reducers/UI';

const ControlPanelContainer = () => {
    const isVisible = useSelector(isControlPanelVisibleSelector);

    if (!isVisible) {
        return null;
    }

    return <ControlPanel />;
};

export default ControlPanelContainer;
