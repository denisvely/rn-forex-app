import React, { useEffect, useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "react-native";

import {
  HeaderLeft,
  HeaderRight,
  NotificationsIcon,
  HeaderTitleLogo,
} from "components";
import { headerOptions } from "constants";
import {
  Quotes,
  OpenPositionsRealForex,
  PendingOrdersRealForex,
  ClosedPositionsRealForex,
  Balance,
} from "../screens";

import { CustomTabBar, MarginCallModal } from "../components";
import {
  loadInitialRealForexData,
  getBalance,
  getRealForexBalance,
  getRealForexPrices,
  getRealForexTradingSettings,
  getRealForexOpenPositions,
  startSignalR,
} from "../store/realForex";
import { convertUnits } from "../store/realForex/helpers";
import { signalRStop } from "../store/realForex/signalRActions";
import { getUser } from "../store/app";

const RealForexStack = createBottomTabNavigator();

const RealForexStackNavigator = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const realForexBalance = useSelector((state) => getRealForexBalance(state));
  const user = useSelector((state) => getUser(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const tradingSettings = useSelector((state) =>
    getRealForexTradingSettings(state)
  );
  const openPositions = useSelector((state) =>
    getRealForexOpenPositions(state)
  );
  const appState = useRef(AppState.currentState);

  const initialMarginData = {
    isMarginCallShown: false,
    isMarginCall70Shown: false,
    isMarginCall90Shown: false,
    marginCallShownDate: null,
    percent: null,
    marginCallModalVisibile: false,
  };
  const [marginCallData, setState] = useState(initialMarginData);

  const checkMarginOnUpdateTradesPrices = () => {
    var totalProfit = 0,
      totalMargin = 0,
      equity = 0;

    openPositions.forEach((item, index) => {
      // add result
      if (typeof realForexPrices != "undefined" && realForexPrices != null) {
        if (realForexPrices[item.tradableAssetId] != undefined) {
          if (item.actionType == "Sell") {
            totalProfit += parseFloat(
              (parseFloat(item.rate) -
                parseFloat(realForexPrices[item.tradableAssetId].ask)) *
                parseFloat(item.pip) *
                Math.pow(10, parseFloat(item.accuracy))
            );
          } else {
            totalProfit += parseFloat(
              (parseFloat(realForexPrices[item.tradableAssetId].bid) -
                parseFloat(item.rate)) *
                parseFloat(item.pip) *
                Math.pow(10, parseFloat(item.accuracy))
            );
          }
        }
      }
    });

    openPositions.forEach((item, index) => {
      // add swap
      if (item.swap !== "" && !isNaN(item.swap)) {
        totalProfit += parseFloat(item.swap);
      }
    });

    if (user.forexModeId === 3 && user.forexMarginModeId === 1) {
      let checkedAssets = [];
      for (let k = 0; k < openPositions.length; k++) {
        if (openPositions[k].optionType === "HARealForex") {
          if (checkedAssets.indexOf(openPositions[k].tradableAssetId) === -1) {
            checkedAssets.push(openPositions[k].tradableAssetId);

            let totalBuyMargin = 0;
            let totalSellMargin = 0;
            let currResult =
              ((openPositions[k].actionType === "Sell"
                ? realForexPrices[openPositions[k].tradableAssetId].bid
                : realForexPrices[openPositions[k].tradableAssetId].ask) *
                parseFloat(
                  convertUnits(
                    openPositions[k].volume,
                    openPositions[k].tradableAssetId,
                    !tradingSettings.IsVolumeInUnits,
                    tradingSettings
                  )
                )) /
              (openPositions[k].leverage * openPositions[k].exchangeRate);

            if (openPositions[k].actionType === "Sell") {
              if (!isNaN(currResult)) {
                totalSellMargin += parseFloat(currResult);
              }
            } else {
              if (!isNaN(currResult)) {
                totalBuyMargin += parseFloat(currResult);
              }
            }

            for (let l = k + 1; l < openPositions.length; l++) {
              if (
                openPositions[k].tradableAssetId ===
                openPositions[l].tradableAssetId
              ) {
                currResult =
                  ((openPositions[l].actionType === "Sell"
                    ? realForexPrices[openPositions[l].tradableAssetId].bid
                    : realForexPrices[openPositions[l].tradableAssetId].ask) *
                    parseFloat(
                      convertUnits(
                        openPositions[l].volume,
                        openPositions[l].tradableAssetId,
                        !tradingSettings.IsVolumeInUnits,
                        tradingSettings
                      )
                    )) /
                  (openPositions[l].leverage * openPositions[l].exchangeRate);

                if (openPositions[l].actionType === "Sell") {
                  if (!isNaN(currResult)) {
                    totalSellMargin += parseFloat(currResult);
                  }
                } else {
                  if (!isNaN(currResult)) {
                    totalBuyMargin += parseFloat(currResult);
                  }
                }
              }
            }

            totalMargin += Math.abs(totalBuyMargin - totalSellMargin);
          }
        }
      }
    } else {
      openPositions.forEach((item, index) => {
        totalMargin +=
          ((item.actionType === "Sell"
            ? realForexPrices[item.tradableAssetId].bid
            : realForexPrices[item.tradableAssetId].ask) *
            parseFloat(
              convertUnits(
                item.volume,
                item.tradableAssetId,
                !tradingSettings.IsVolumeInUnits,
                tradingSettings
              )
            )) /
          (item.leverage * item.exchangeRate);
      });
    }

    if (realForexBalance) {
      equity = parseFloat(realForexBalance.balance) + parseFloat(totalProfit);

      if (
        parseFloat((totalMargin * parseFloat(user.MarginUsage)) / equity) >= 50
      ) {
        if (
          parseFloat((totalMargin * parseFloat(user.MarginUsage)) / equity) >=
            90 &&
          !marginCallData.isMarginCall90Shown
        ) {
          var percent = 90;
          setState((prevState) => ({
            ...prevState,
            isMarginCall90Shown: true,
            isMarginCall70Shown: true,
            isMarginCallShown: false,
            percent: 90,
          }));
        } else if (
          parseFloat((totalMargin * parseFloat(user.MarginUsage)) / equity) >=
            70 &&
          !marginCallData.isMarginCall70Shown
        ) {
          var percent = 70;
          setState((prevState) => ({
            ...prevState,
            isMarginCall90Shown: false,
            isMarginCall70Shown: true,
            isMarginCallShown: false,
            percent: 70,
          }));
        } else {
          var percent = 50;
          setState((prevState) => ({
            ...prevState,
            percent: 50,
          }));
        }

        if (!marginCallData.isMarginCallShown) {
          marginCallNotification(percent);

          var showMarginPopUp = setInterval(function () {
            marginCallNotification(percent);
          }, 60000);
        }
      } else {
        let now = new Date();

        if (marginCallData.isMarginCallShown) {
          if (
            now.getTime() - marginCallData.marginCallShownDate.getTime() >
            60000
          ) {
            setState((prevState) => ({
              ...prevState,
              isMarginCallShown: false,
            }));
            clearInterval(showMarginPopUp);
          }
        }
      }
    }
  };

  const marginCallNotification = (percent) => {
    if (marginCallData.isMarginCallShown || openPositions.length == 0) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      isMarginCallShown: true,
      marginCallModalVisibile: true,
      percent: percent,
      marginCallShownDate: new Date(),
    }));
  };

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      startSignalR(dispatch);
    } else if (
      appState.current.match(/inactive|active/) &&
      nextAppState === "background"
    ) {
      signalRStop();
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    if (
      realForexPrices &&
      openPositions &&
      openPositions.length > 0 &&
      realForexBalance &&
      tradingSettings
    ) {
      checkMarginOnUpdateTradesPrices();
    }
  }, [openPositions, realForexBalance, tradingSettings]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );
    loadInitialRealForexData(dispatch);
    const getUserBalance = setInterval(() => {
      getBalance(dispatch);
    }, 15000);
    return () => {
      signalRStop();
      clearInterval(getUserBalance);
      subscription.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  return (
    <>
      {!!marginCallData.marginCallModalVisibile && (
        <MarginCallModal
          percent={marginCallData.percent}
          setState={setState}
          navigation={navigation}
        />
      )}

      <RealForexStack.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        initialRouteName="quotes"
        screenOptions={{
          animationEnabled: true,
          headerShown: true,
          unmountOnBlur: true,
        }}
      >
        <RealForexStack.Screen
          name="quotes"
          options={{
            tabBarLabel: "quotes",
            title: "",
            headerTitleAlign: "center",
            ...headerOptions.headerTitleStyle,
            ...headerOptions.leftAndRightPadding,
            ...headerOptions.whiteBackgroundHeader,
            unmountOnBlur: true,
            headerLeft: () => (
              <HeaderLeft navigation={navigation} showDrawer={true} />
            ),
            headerTitle: () => <HeaderTitleLogo />,
            headerRight: () => (
              <HeaderRight
                navigation={navigation}
                firstComponent={<NotificationsIcon navigation={navigation} />}
              />
            ),
          }}
        >
          {(props) => <Quotes {...props} />}
        </RealForexStack.Screen>
        <RealForexStack.Screen
          name="openPositions"
          options={{
            tabBarLabel: "openPositions",
            title: t("navigation.openPositions"),
            headerTitleAlign: "center",
            ...headerOptions.headerTitleStyle,
            ...headerOptions.leftAndRightPadding,
            ...headerOptions.whiteBackgroundHeader,
            unmountOnBlur: true,
            headerLeft: () => (
              <HeaderLeft navigation={navigation} showDrawer={true} />
            ),
            headerTitle: () => <HeaderTitleLogo />,
            headerRight: () => (
              <HeaderRight
                navigation={navigation}
                firstComponent={<NotificationsIcon navigation={navigation} />}
              />
            ),
          }}
        >
          {(props) => <OpenPositionsRealForex {...props} />}
        </RealForexStack.Screen>
        <RealForexStack.Screen
          name="pendingOrders"
          options={{
            tabBarLabel: "pendingOrders",
            title: t("navigation.pendingOrders"),
            unmountOnBlur: true,
            headerTitleAlign: "center",
            ...headerOptions.headerTitleStyle,
            ...headerOptions.leftAndRightPadding,
            ...headerOptions.whiteBackgroundHeader,
            headerLeft: () => (
              <HeaderLeft navigation={navigation} showDrawer={true} />
            ),
            headerTitle: () => <HeaderTitleLogo />,
            headerRight: () => (
              <HeaderRight
                navigation={navigation}
                firstComponent={<NotificationsIcon navigation={navigation} />}
              />
            ),
          }}
        >
          {(props) => <PendingOrdersRealForex {...props} />}
        </RealForexStack.Screen>
        <RealForexStack.Screen
          name="closedPositions"
          options={{
            tabBarLabel: "closedPositions",
            title: t("navigation.closedPositions"),
            headerTitleAlign: "center",
            ...headerOptions.headerTitleStyle,
            ...headerOptions.leftAndRightPadding,
            ...headerOptions.whiteBackgroundHeader,
            unmountOnBlur: true,
            headerLeft: () => (
              <HeaderLeft navigation={navigation} showDrawer={true} />
            ),
            headerTitle: () => <HeaderTitleLogo />,
            headerRight: () => (
              <HeaderRight
                navigation={navigation}
                firstComponent={<NotificationsIcon navigation={navigation} />}
              />
            ),
          }}
        >
          {(props) => <ClosedPositionsRealForex {...props} />}
        </RealForexStack.Screen>
        <RealForexStack.Screen
          name="balance"
          options={{
            tabBarLabel: "balance",
            title: t("navigation.balance"),
            headerTitleAlign: "center",
            ...headerOptions.headerTitleStyle,
            ...headerOptions.leftAndRightPadding,
            ...headerOptions.whiteBackgroundHeader,
            unmountOnBlur: true,
            headerLeft: () => (
              <HeaderLeft navigation={navigation} showDrawer={true} />
            ),
            headerTitle: () => <HeaderTitleLogo />,
            headerRight: () => (
              <HeaderRight
                navigation={navigation}
                firstComponent={<NotificationsIcon navigation={navigation} />}
              />
            ),
          }}
        >
          {(props) => <Balance {...props} />}
        </RealForexStack.Screen>
      </RealForexStack.Navigator>
    </>
  );
};

export default RealForexStackNavigator;
