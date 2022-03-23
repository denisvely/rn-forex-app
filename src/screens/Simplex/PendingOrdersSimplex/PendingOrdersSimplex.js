import React, { useRef } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getSimplexPendingOrders } from "../../../store/simplex";
import { deviceWidth } from "../../../utils";
import {
    LazyFlatList,
    Typography,
    PendingOrdersSimplexTradeBox,
} from "../../../components";
import simplexServices from '../../../services/simplexServices';

import styles from "./pendingOrdersSimplexStyles";
import * as actionTypes from "../../../store/simplex/actionTypes";

const PendingOrdersSimplex = ({ navigation }) => {
    const pendingOrdersRef = useRef();
    const dispatch = useDispatch();
    const pendingOrders = useSelector((state) =>
        getSimplexPendingOrders(state)
    );
    const cancelSimplexPendingOrder = (id) => {
        simplexServices.cancelPendingOrder(id)
            .fetch()
            .then(({ response }) => {
                simplexServices.getSimplexPendingOrders().fetch()
                    .then(({response}) => {
                        const body = response.body.data ? response.body.data.results : [];
                        dispatch({
                            type: actionTypes.SIMPLEX_PENDING_ORDERS,
                            payload: body,
                        });
                    })
            });
    };

    return (
        <View style={styles.container}>
            {pendingOrders ? (
                <LazyFlatList
                    list={pendingOrders}
                    renderItem={({ item }) => {
                        return (
                            <PendingOrdersSimplexTradeBox item={item} navigation={navigation} cancelOrder={cancelSimplexPendingOrder} />
                        );
                    }}
                    keyExtractor={(item) => item.OrderID}
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
                    listRef={pendingOrdersRef}
                />
            ) : (
                <View style={styles.noTrades}>
                    <Typography name="largeBold" text={"No trades found."} />
                </View>
            )}
        </View>
    );
};

export default PendingOrdersSimplex;
