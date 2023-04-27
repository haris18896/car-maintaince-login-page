import React, { useEffect, createContext } from "react";
import messaging from "@react-native-firebase/messaging";
import Utilities from "../utils/UtilityMethods";

const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
  useEffect(() => {messaging().getToken().then((token) => {
        // if (user) {
          // TODO: Call Notification API
        // }
      })
      .catch((err) => {
      });
  }, []);

  useEffect(() => {
    Utilities.addNotificationListener();
  }, []);

  return (
    <NotificationsContext.Provider value={{}}>
      {children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsProvider };
