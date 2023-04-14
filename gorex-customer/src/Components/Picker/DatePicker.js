import React from "react";

import DP from "react-native-date-picker";

const DatePicker = ({show, setShow, date, setDate}) => {
    return(
        <DP
            modal
            open={show}
            mode="date"
            date={date ? date : new Date()}
            onCancel={() => setShow(false)}
            onConfirm={(date) => {
                setDate(date);
                setShow(false);
            }} />
    );
};

export default DatePicker;
