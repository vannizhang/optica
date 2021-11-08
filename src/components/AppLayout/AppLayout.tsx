import React from 'react';

import { MapPanels, ControlPanel, ControlPanelToggleBtn } from '../';

const AppLayout = () => {
    return (
        <>
            <MapPanels />
            <ControlPanel />
            <ControlPanelToggleBtn />
        </>
    );
};

export default AppLayout;
