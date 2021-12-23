import React, { useState, createContext, useEffect } from 'react';

import IPortal from 'esri/portal/Portal';
import ICredential from 'esri/identity/Credential';

import {
    initEsriOAuth,
    signIn,
    signOut,
    getUserData,
    UserData,
    switchAccount,
} from '../utils/esri-oauth';

type EsriOAuthContextValue = {
    signedIn: boolean;
    credential: ICredential;
    portal: IPortal;
    userData: UserData;
    signIn: () => void;
    signOut: () => void;
    switchAccount: () => void;
};

type EsriOAuthProviderProps = {
    appId: string;
    portalUrl?: string;
    children?: React.ReactNode;
};

export const EsriOAuthContext = createContext<EsriOAuthContextValue>(null);

const EsriOAuthProvider: React.FC<EsriOAuthProviderProps> = ({
    appId,
    portalUrl,
    children,
}: EsriOAuthProviderProps) => {
    const [value, setValue] = useState<EsriOAuthContextValue>(null);

    const init = async () => {
        try {
            const { credential, portal } = await initEsriOAuth({
                appId,
                portalUrl,
            });

            const userData = portal ? getUserData() : null;

            setValue({
                signedIn: portal !== null,
                credential,
                portal,
                userData,
                signIn,
                signOut,
                switchAccount,
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <EsriOAuthContext.Provider value={value}>
            {value ? children : null}
        </EsriOAuthContext.Provider>
    );
};

export default EsriOAuthProvider;
