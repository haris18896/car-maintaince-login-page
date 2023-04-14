import React, { createContext, useState } from "react";

export const CommonContext = createContext();

const ContextProvider = (props) => {
    const [userProfile, setUserProfile] = useState(null);
    const [partnerId, setPartnerId] = useState(-1);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [inCartOrder, setInCartOrder] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    return (
        <CommonContext.Provider value={ {
            userProfile: userProfile,
            setUserProfile: (userProfile) => {
                setUserProfile(userProfile)
            },

            partnerId: partnerId,
            setPartnerId: (partnerId) => {
                setPartnerId(partnerId)
            },

            selectedBranch: selectedBranch,
            setSelectedBranch: (selectedBranch) => {
                setSelectedBranch(selectedBranch)
            },

            inCartOrder: inCartOrder,
            setInCartOrder: (inCartOrder) => {
                setInCartOrder(inCartOrder)
            },

            currentLocation: currentLocation,
            setCurrentLocation: (currentLocation) => {
                setCurrentLocation(currentLocation)
            },
        }}>

            {props.children}
        </CommonContext.Provider>
    );
};

export default ContextProvider;
