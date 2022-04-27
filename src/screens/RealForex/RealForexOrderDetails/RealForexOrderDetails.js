import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { HeaderAssetInfo, Typography } from "../../../components";
import { formatDeciamlWithComma } from "../../../store/realForex/helpers";
import {
  getRealForexTradingSettings,
  getRealForexAssetsSettings,
  setSelectedAsset,
  getCurrentTrade,
  setCurrentTrade,
  getRealForexPrices,
  getRealForexOpenPositions,
  setCurrentlyModifiedOrder,
} from "../../../store/realForex";
import { getUser } from "store/app";
import { convertUnits, getSpreadValue } from "store/realForex/helpers";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MarketTab from "./components/MarketTab";
import PendingTab from "./components/PendingTab";
import ProfitLoss from "./components/ProfitLossTab";
import OrderTabBar from "./components/OrderTab/OrderTabBar";
import { colors } from "../../../constants";

import styles from "./realForexOrderDetailsStyles";
import { upperCase } from "lodash";

const Tab = createMaterialTopTabNavigator();

const RealForexOrderDetails = ({ route, navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const asset = route.params.asset;
  const isBuy = route.params.isBuy ? true : false;
  const order = route.params.order;
  const isPending = route.params.isPending;
  const isMarketClosed = route.params.isMarketClosed;

  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const assetsSettings = useSelector((state) =>
    getRealForexAssetsSettings(state)
  );
  const realForexOpenPositions = useSelector((state) =>
    getRealForexOpenPositions(state)
  );
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const user = useSelector((state) => getUser(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  // State
  const [quantity, setQuantity] = useState(null);
  const [isReady, setReadyState] = useState(false);

  const makeOrder = () => {
    const forexOpenPositionsOnly = realForexOpenPositions.filter(function (el) {
      return el.optionType == "HARealForex";
    });

    if (forexOpenPositionsOnly.length >= settings.MaxOpenPositions) {
      // Notification for maxOpenPos
      return;
    }

    if (order) {
      if (isPending) {
        order.isPending = true;
      }
      setCurrentlyModifiedOrder(dispatch, order);
    }

    // Set Current Trade in Store
    currentTrade.tradableAssetId = asset.id;
    currentTrade.action = isBuy;
    currentTrade.isBuy = isBuy;
    currentTrade.price = assetsSettings[asset.id].MinQuantity;
    currentTrade.strike = isBuy
      ? realForexPrices[asset.id].ask
      : realForexPrices[asset.id].bid;
    currentTrade.quantity = !settings.IsVolumeInUnits
      ? convertUnits(
          currentTrade.price,
          asset.id,
          true,
          assetsSettings[asset.id]
        )
      : currentTrade.price;
    currentTrade.expiration = new Date(asset.rules[0].dates.to.timestamp);
    currentTrade.currency = user.currencySymbol;
    currentTrade.takeProfit = null;
    currentTrade.stopLoss = null;
    currentTrade.pendingDate = null;
    setCurrentTrade(dispatch, currentTrade);

    // Set SelectedAsset in Store
    asset.rate = assetsSettings[asset.id].ExchangeRate;
    asset.distance = parseFloat(assetsSettings[asset.id].Distance).toFixed(
      asset.accuracy
    );
    asset.Leverage = assetsSettings[asset.id].Leverage;
    asset.MaxQuantity = convertUnits(
      assetsSettings[asset.id].MaxQuantity,
      asset.id,
      false,
      settings
    );
    asset.MinQuantity = convertUnits(
      assetsSettings[asset.id].MinQuantity,
      asset.id,
      false,
      settings
    );
    asset.initialDistance = (
      parseFloat(assetsSettings[asset.id].Distance) * 3
    ).toFixed(asset.accuracy);
    asset.quantityMultiplier = assetsSettings[asset.id].QuantityMultiplier;

    asset.minAmount = (
      (parseFloat(asset.distance) *
        parseFloat(
          !order
            ? parseFloat(asset.MinQuantity)
            : typeof order.Volume != "undefined"
            ? order.Volume
            : order.volume
        ) *
        1) /
      asset.rate
    ).toFixed(2);

    asset.quantity = !settings.IsVolumeInUnits
      ? asset.MinQuantity * asset.quantityMultiplier.split(",")[0]
      : formatDeciamlWithComma(
          asset.MinQuantity * asset.quantityMultiplier.split(",")[0]
        );
    asset.minSLDistance = (
      parseFloat(
        getSpreadValue(
          realForexPrices[asset.id].ask,
          realForexPrices[asset.id].bid,
          realForexPrices[asset.id].accuracy
        ) * Math.pow(10, -realForexPrices[asset.id].accuracy)
      ) + parseFloat(asset.distance)
    ).toFixed(asset.accuracy);

    const quantity = order
      ? !settings.IsVolumeInUnits
        ? isPending
          ? order.Volume
          : order.volume
        : isPending
        ? formatDeciamlWithComma(parseFloat(order.Volume))
        : formatDeciamlWithComma(parseFloat(order.volume))
      : asset.quantity;

    setSelectedAsset(dispatch, asset);
    setQuantity(`${quantity}`);
    setReadyState(true);
  };

  useEffect(() => {
    if (
      asset &&
      realForexOpenPositions &&
      user &&
      currentTrade &&
      settings &&
      assetsSettings
    ) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderAssetInfo asset={asset} navigation={navigation} />
        ),
      });
      makeOrder();
    }
  }, [route.params.asset]);

  return isReady ? (
    <>
      {order ? (
        // Pending
        <View style={styles.modifyTitle}>
          <View style={styles.left}>
            <>
              {isPending ? (
                <Typography
                  name="normal"
                  text={
                    order.IsBuy
                      ? t("common-labels.Buy")
                      : t("common-labels.Sell")
                  }
                  style={{
                    color: order.IsBuy ? colors.buyColor : colors.sellColor,
                    textTransform: "uppercase",
                  }}
                />
              ) : (
                <Typography
                  name="normal"
                  text={
                    order.actionType === "Buy"
                      ? t("common-labels.Buy")
                      : t("common-labels.Sell")
                  }
                  style={{
                    color:
                      order.actionType === "Buy"
                        ? colors.buyColor
                        : colors.sellColor,
                    textTransform: "uppercase",
                  }}
                />
              )}
            </>
            <Typography
              name="normal"
              text={
                isPending
                  ? order.Volume
                  : settings.IsVolumeInUnits
                  ? order.volume
                  : parseFloat(order.volume).toFixed(2)
              }
              style={styles.paddingLeft}
            />
            <Typography name="normal" text={"@"} style={styles.blue} />
            <Typography
              name="normal"
              text={isPending ? order.MarketRate : order.rate}
              style={styles.paddingLeft}
            />
          </View>
          <Typography
            name="normal"
            text={`POS${isPending ? order.OrderID : order.orderID}`}
            style={styles.orderId}
          />
        </View>
      ) : null}
      <Tab.Navigator
        tabBar={(props) => (
          <OrderTabBar
            state={props.state}
            navigation={props.navigation}
            isPending={isPending}
            order={order}
          />
        )}
        initialRouteName={isPending ? "Pending" : "Market"}
        style={{ backgroundColor: colors.white }}
      >
        <Tab.Screen name="Market">
          {() =>
            !isPending ? (
              order ? (
                <ProfitLoss
                  asset={asset}
                  isDirectionBuy={isBuy}
                  navigation={navigation}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  isReady={isReady}
                  isModify={order ? true : false}
                  isMarketClosed={isMarketClosed}
                />
              ) : (
                <MarketTab
                  asset={asset}
                  isDirectionBuy={isBuy}
                  navigation={navigation}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  isReady={isReady}
                  isModify={order ? true : false}
                  isMarketClosed={isMarketClosed}
                />
              )
            ) : null
          }
        </Tab.Screen>
        <Tab.Screen name="Pending">
          {() => (
            <PendingTab
              asset={asset}
              isDirectionBuy={isBuy}
              navigation={navigation}
              quantity={quantity}
              setQuantity={setQuantity}
              isReady={isReady}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  ) : null;
};

export default RealForexOrderDetails;
