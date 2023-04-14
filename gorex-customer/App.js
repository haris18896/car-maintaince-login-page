//import liraries
// android:windowSoftInputMode="adjustResize"
import React from "react";
import Navigation from "./src/navigations";
import { StyleSheet, StatusBar } from "react-native";
import ContextProvider from "./src/contexts/ContextProvider";
import KeyboardProvider from "./src/contexts/KeyboardProvider";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { NotificationsProvider } from "./src/contexts/NotificationsContext";

import "./src/i18n";
import Colors from "./src/Constants/Colors";

const App = () => {
    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{
                    height: "auto",
                    borderLeftColor: Colors.DARKERGREEN,
                    elevation: 7,
                    padding: 10,
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    shadowOffset: { width: 0, height: 2 },
                    shadowColor: "#000",
                }}
                text1NumberOfLines={10}
                text2NumberOfLines={10}
            />
        ),
        error: (props) => (
            <ErrorToast
                {...props}
                style={{
                    height: "auto",
                    borderLeftColor: Colors.RED,
                    padding: 10,
                    elevation: 7,
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    shadowOffset: { width: 0, height: 2 },
                    shadowColor: "#000",
                }}
                text1NumberOfLines={10}
                text2NumberOfLines={10}
            />
        ),
    };
    return (
        <NotificationsProvider>
            <ContextProvider>
                <KeyboardProvider>
                    <StatusBar barStyle={'light-content'} />
                    <Navigation />
                    <Toast config={toastConfig} />
                </KeyboardProvider>
            </ContextProvider>
        </NotificationsProvider>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.BLUE,
        flex: 1,
    },

    uperSafeArea: {
        // backgroundColor: Colors.BLUE,
        flex: 0,
    },
});

//make this component available to the app
export default App;
