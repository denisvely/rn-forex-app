import React, {useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {
    HeaderLeft,
    HeaderRight,
    NotificationsIcon,
    CustomTabBar
} from "../components";
import {headerOptions} from "../constants";
import {
    QuotesSimplex,
    OpenPositionsSimplex,
    PendingOrdersSimplex,
    ClosedPositionsSimplex,
    SimplexBalance,
} from "../screens";

import {loadInitialSimplexData} from "../store/simplex";
import {signalRStop} from "../store/simplex/signalRActions";

const SimplexStack = createBottomTabNavigator();

const SimplexStackNavigator = ({navigation}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        loadInitialSimplexData(dispatch);
        return () => {
            signalRStop();
        };
    }, []);

    return (
        <SimplexStack.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            initialRouteName="quotes"
            screenOptions={{
                animationEnabled: true,
                headerShown: true,
            }}
        >
            <SimplexStack.Screen
                name="quotes"
                options={{
                    tabBarLabel: "quotes",
                    title: t("navigation.quotes"),
                    headerTitleAlign: "center",
                    ...headerOptions.headerTitleStyle,
                    ...headerOptions.leftAndRightPadding,
                    ...headerOptions.whiteBackgroundHeader,
                    headerLeft: () => (
                        <HeaderLeft navigation={navigation} showDrawer={true}/>
                    ),
                    headerRight: () => (
                        <HeaderRight
                            navigation={navigation}
                            firstComponent={<NotificationsIcon navigation={navigation}/>}
                        />
                    ),
                }}
            >
                {(props) => <QuotesSimplex {...props} />}
            </SimplexStack.Screen>
            <SimplexStack.Screen
                name="openPositions"
                options={{
                    tabBarLabel: "openPositions",
                    title: t("navigation.openPositions"),
                    headerTitleAlign: "center",
                    ...headerOptions.headerTitleStyle,
                    ...headerOptions.leftAndRightPadding,
                    ...headerOptions.whiteBackgroundHeader,
                    headerLeft: () => (
                        <HeaderLeft navigation={navigation} showDrawer={true}/>
                    ),
                    headerRight: () => (
                        <HeaderRight
                            navigation={navigation}
                            firstComponent={<NotificationsIcon navigation={navigation}/>}
                        />
                    ),
                }}
            >
                {(props) => <OpenPositionsSimplex {...props} />}
            </SimplexStack.Screen>
            <SimplexStack.Screen
                name="pendingOrders"
                options={{
                    tabBarLabel: "pendingOrders",
                    title: t("navigation.pendingOrders"),
                    headerTitleAlign: "center",
                    ...headerOptions.headerTitleStyle,
                    ...headerOptions.leftAndRightPadding,
                    ...headerOptions.whiteBackgroundHeader,
                    headerLeft: () => (
                        <HeaderLeft navigation={navigation} showDrawer={true}/>
                    ),
                    headerRight: () => (
                        <HeaderRight
                            navigation={navigation}
                            firstComponent={<NotificationsIcon navigation={navigation}/>}
                        />
                    ),
                }}
            >
                {(props) => <PendingOrdersSimplex {...props} />}
            </SimplexStack.Screen>
            <SimplexStack.Screen
                name="closedPositions"
                options={{
                    tabBarLabel: "closedPositions",
                    title: t("navigation.closedPositions"),
                    headerTitleAlign: "center",
                    ...headerOptions.headerTitleStyle,
                    ...headerOptions.leftAndRightPadding,
                    ...headerOptions.whiteBackgroundHeader,
                    headerLeft: () => (
                        <HeaderLeft navigation={navigation} showDrawer={true}/>
                    ),
                    headerRight: () => (
                        <HeaderRight
                            navigation={navigation}
                            firstComponent={<NotificationsIcon navigation={navigation}/>}
                        />
                    ),
                }}
            >
                {(props) => <ClosedPositionsSimplex {...props} />}
            </SimplexStack.Screen>
            <SimplexStack.Screen
                name="balance"
                options={{
                    tabBarLabel: "balance",
                    title: t("navigation.balance"),
                    headerTitleAlign: "center",
                    ...headerOptions.headerTitleStyle,
                    ...headerOptions.leftAndRightPadding,
                    ...headerOptions.whiteBackgroundHeader,
                    headerLeft: () => (
                        <HeaderLeft navigation={navigation} showDrawer={true}/>
                    ),
                    headerRight: () => (
                        <HeaderRight
                            navigation={navigation}
                            firstComponent={<NotificationsIcon navigation={navigation}/>}
                        />
                    ),
                }}
            >
                {(props) => <SimplexBalance {...props} />}
            </SimplexStack.Screen>
        </SimplexStack.Navigator>
    );
};

export default SimplexStackNavigator;
