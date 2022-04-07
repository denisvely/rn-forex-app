import React, { useRef, useState } from "react";
import { View, Pressable } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";

import {
    LazyFlatList,
    ClosedPositionsSimplexTradeBox,
    Typography,
} from "../../../components";
import { getSimplexClosedPositions } from "../../../store/simplex";
import { deviceWidth } from "../../../utils";
import { tabStackIcons } from "../../../assets/svg/tabStackIcons/";
import { SvgXml } from "react-native-svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./closedPositionsSimplexStyles";

const ClosedPositionsSimplex = ({ navigation }) => {
    const [fromDate, setFromDate] = useState(
        moment(new Date().setMonth(new Date().getMonth() - 1)).format("DD-MM-YYYY")
    );
    const [toDate, setToDate] = useState(
        moment(new Date()).format("DD-MM-YYYY")
    );
    const closedPositionsRef = useRef();
    const closedPositions = useSelector((state) =>
        getSimplexClosedPositions(state)
    );



    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={styles.container}>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
            {!show && (
                <View style={styles.closePositionFilterWrapper}>
                    <Pressable
                        style={styles.closePositionFilter}
                        onPress={showDatepicker}
                    >
                        <SvgXml
                            xml={tabStackIcons["closedPositions"][0]}
                            width="16"
                            height="16"
                        />
                        <Typography name="small" text={fromDate} style={styles.dateString} />
                        <Typography name="small" text={"-"} />
                        <Typography name="small" text={toDate} style={styles.dateString} />
                    </Pressable>
                </View>
            )}
            {closedPositions && !show ? (
                <LazyFlatList
                    list={closedPositions}
                    renderItem={({ item }) => {
                        return (
                            <ClosedPositionsSimplexTradeBox item={item} navigation={navigation} />
                        );
                    }}
                    keyExtractor={(item) => item.orderId}
                    showsVerticalScrollIndicator={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        width: deviceWidth,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        paddingBottom: 100,
                    }}
                    style={styles.flatListContainer}
                    listRef={closedPositionsRef}
                />
            ) : (
                <View style={styles.noTrades}>
                    <Typography name="largeBold" text={"No trades found."} />
                </View>
            )}
        </View>
    );
};

export default ClosedPositionsSimplex;
