import React, { useContext } from 'react';
import { EsriOAuthContext } from '../../contexts/EsriOAuthProvider';

const OAuthControl = () => {
    const { signOut, signIn, credential, userData } = useContext(
        EsriOAuthContext
    );

    const getBtnLabel = () => {
        if (!credential) {
            return <span>Sign In</span>;
        }

        const { name, image } = userData;

        return (
            <span>
                <b>Sign Out</b> as {name}
            </span>
        );
    };

    const onClickHandler = () => {
        if (!credential) {
            signIn();
        } else {
            signOut();
        }
    };

    return (
        <div className="absolute top-2 right-2" onClick={onClickHandler}>
            <div className="text-white text-sm cursor-pointer">
                {getBtnLabel()}
            </div>
        </div>
    );
};

export default OAuthControl;
