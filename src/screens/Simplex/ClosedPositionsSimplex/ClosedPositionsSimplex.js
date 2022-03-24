import React, { useRef, useState } from "react";
import { View, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
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

import styles from "./closedPositionsSimplexStyles";

const ClosedPositionsSimplex = ({ navigation }) => {
    const dispatch = useDispatch();
    const [fromDate, setFromDate] = useState(
        moment(new Date()).format("DD-MM-YYYY")
    );
    const [toDate, setToDate] = useState(
        moment(new Date().setMonth(new Date().getMonth() + 1)).format("DD-MM-YYYY")
    );
    const closedPositionsRef = useRef();
    const closedPositions = useSelector((state) =>
        getSimplexClosedPositions(state)
    );

    return (
        <View style={styles.container}>
            <View style={styles.closePositionFilterWrapper}>
                <Pressable
                    style={styles.closePositionFilter}
                    onPress={() => alert("Closed Positions FIlter")}
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
            {closedPositions ? (
                <LazyFlatList
                    list={closedPositions}
                    renderItem={({ item }) => {
                        return (
                            <ClosedPositionsSimplexTradeBox item={item} navigation={navigation} />
                        );
                    }}
                    keyExtractor={(item) => item.positionId}
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
