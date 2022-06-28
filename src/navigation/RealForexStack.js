import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

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

  const initialMarginData = {
    isMarginCallShown: false,
    isMarginCall70Shown: false,
    isMarginCall90Shown: false,
    marginCallShownDate: null,
    percent: null,
  };
  const [marginCallData, setState] = useState(initialMarginData);

  const checkMarginOnUpdateTradesPrices = () => {
    let totalProfit = 0,
      totalMargin = 0,
      equity = 0;

    openPositions.forEach((item, index) => {
      // add swap
      if (item.swap !== "" && !isNaN(item.swap)) {
        totalProfit += parseFloat(item.swap);
      }

      // add result
      if (typeof realForexPrices != "undefined" && realForexPrices != null) {
        if (realForexPrices[item.tradableAssetId] != undefined) {
          if (item.actionType == "Sell") {
            totalProfit += parseFloat(
              parseFloat(
                item.rate - realForexPrices[item.tradableAssetId].ask
              ) *
                parseFloat(item.volume) *
                (1 / item.exchangeRate)
            ).toFixed(2);
          } else {
            totalProfit += parseFloat(
              parseFloat(
                realForexPrices[item.tradableAssetId].bid - item.rate
              ) *
                parseFloat(item.volume) *
                (1 / item.exchangeRate)
            ).toFixed(2);
          }
        }
      }

      if (user.forexModeId === 3 && user.forexMarginModeId === 1) {
        let checkedAssets = [];
        for (let k = 0; k < openPositions.length; k++) {
          if (openPositions[k].optionType === "HARealForex") {
            if (
              checkedAssets.indexOf(openPositions[k].tradableAssetId) === -1
            ) {
              checkedAssets.push(openPositions[k].tradableAssetId);

              let totalBuyMargin = 0;
              let totalSellMargin = 0;
              let currResult = (
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
                (openPositions[k].leverage * openPositions[k].exchangeRate)
              ).toFixed(2);

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
                  currResult = (
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
                    (openPositions[l].leverage * openPositions[l].exchangeRate)
                  ).toFixed(2);

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
        totalMargin += (
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
          (item.leverage * item.exchangeRate)
        ).toFixed(2);
      }

      equity = (
        parseFloat(realForexBalance.balance) + parseFloat(totalProfit)
      ).toFixed(2);

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
          }));
        } else {
          var percent = 50;
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
    });
  };

  const marginCallNotification = (percent) => {
    if (marginCallData.isMarginCallShown || openPositions.length == 0) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      isMarginCallShown: true,
      marginCallShownDate: new Date(),
    }));
  };

  useEffect(() => {
    if (realForexPrices && openPositions && openPositions.length > 0) {
      checkMarginOnUpdateTradesPrices();
    }
  }, [realForexPrices, openPositions]);

  useEffect(() => {
    loadInitialRealForexData(dispatch);
    const getUserBalance = setInterval(() => {
      getBalance(dispatch);
    }, 15000);
    return () => {
      signalRStop();
      clearInterval(getUserBalance);
    };
  }, []);

  return (
    <>
      {/*{!!marginCallData.isMarginCallShown && (*/}
      {/*  <MarginCallModal*/}
      {/*    state={marginCallData}*/}
      {/*    setState={setState}*/}
      {/*    navigation={navigation}*/}
      {/*  />*/}
      {/*)}*/}

      <RealForexStack.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        initialRouteName="quotes"
        screenOptions={{
          animationEnabled: true,
          headerShown: true,
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
