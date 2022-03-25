import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { Typography, FormattedTypographyWithCurrency } from "components";
import { colors } from "constants";
import {
  getSelectedAsset,
  getRealForexTradingSettings,
  getRealForexPrices,
  getRealForexOpenPositions,
  getRealForexSwapRates,
} from "../../../store/realForex";
import {
  convertUnits,
  getGlobalSetting,
} from "../../../store/realForex/helpers";
import { getSettings } from "../../../store/app";

import styles from "./orderInfoStyles";

// TODO
const showLeverageInfo = true;

const OrderInfo = ({ quantityValue, isMarket }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const realForexSwapRates = useSelector((state) =>
    getRealForexSwapRates(state)
  );
  const realForexOpenPositions = useSelector((state) =>
    getRealForexOpenPositions(state)
  );
  const globalSettings = useSelector((state) => getSettings(state));
  const initialOrderInfoState = {
    marginSell: null,
    marginBuy: null,
    leverageSell: null,
    leverageBuy: null,
    swapSell: null,
    swapBuy: null,
    pipSell: null,
    pipBuy: null,
  };
  const [state, setOrderInfo] = useState(initialOrderInfoState);
  const calculateMarginRequired = (newQuantity) => {
    const quantity =
      newQuantity != undefined
        ? newQuantity
        : convertUnits(
            parseFloat(quantityValue),
            selectedAsset.id,
            true,
            settings
          );

    return (
      (quantity * parseFloat(realForexPrices[selectedAsset.id].rate)) /
      (selectedAsset.Leverage * selectedAsset.rate)
    ).toFixed(2);
  };

  const calculateMarginRequiredNetting = () => {
    const buyMargin = calculateMarginRequired(),
      sellMargin = buyMargin,
      currentQuantity = convertUnits(
        parseFloat(quantityValue),
        selectedAsset.id,
        true,
        settings
      );

    if (realForexOpenPositions && realForexOpenPositions.length > 0) {
      var buyQuantity = 0,
        sellQuantity = 0;

      realForexOpenPositions.forEach(function (order, i) {
        if (
          order.tradableAssetId == selectedAsset.id &&
          order.FollowedUserId == null
        ) {
          if (order.actionType == "Buy") {
            buyQuantity += parseFloat(order.volume);
          } else {
            sellQuantity += parseFloat(order.volume);
          }
        }
      });
    } else {
      return false;
    }

    if (buyQuantity != 0) {
      if (currentQuantity <= buyQuantity) {
        buyMargin = calculateMarginRequired();
        sellMargin = 0;
      } else if (currentQuantity > buyQuantity) {
        buyMargin = calculateMarginRequired();
        sellMargin = calculateMarginRequired(currentQuantity - buyQuantity);
      }
    }

    if (sellQuantity != 0) {
      if (sellQuantity >= currentQuantity) {
        buyMargin = 0;
        sellMargin = calculateMarginRequired();
      } else if (currentQuantity > sellQuantity) {
        buyMargin = calculateMarginRequired(currentQuantity - sellQuantity);
      }
    }

    return {
      buyMargin: buyMargin,
      sellMargin: sellMargin,
    };
  };

  const calculateSwap = () => {
    let quantity = convertUnits(
        parseFloat(quantityValue),
        selectedAsset.id,
        true,
        settings
      ),
      swapRates = {};

    if (realForexSwapRates[selectedAsset.id] == undefined) {
      console.log("missing config - swap rates!");
      return;
    }

    if (isMarket) {
      swapRates.swapBuy = (
        (quantity *
          (getGlobalSetting("DisplaySwapNumbers", globalSettings)
            ? parseFloat(realForexSwapRates[selectedAsset.id].swapLong)
            : (realForexPrices[selectedAsset.id].ask *
                parseFloat(realForexSwapRates[selectedAsset.id].swapLong)) /
              100)) /
        selectedAsset.rate
      ).toFixed(2);
      swapRates.swapSell = (
        (quantity *
          (getGlobalSetting("DisplaySwapNumbers")
            ? parseFloat(realForexSwapRates[selectedAsset.id].swapShort)
            : (realForexPrices[selectedAsset.id].bid *
                parseFloat(realForexSwapRates[selectedAsset.id].swapShort)) /
              100)) /
        selectedAsset.rate
      ).toFixed(2);
    } else {
      // TODO -> Modify
      // if (widget.currentlyModifiedOrder.actionType == "Buy") {
      //   var p = forexHelper.assetsPrices[widget.selectedAsset.id].ask,
      //     q0 = widget.currentlyModifiedOrder.volume,
      //     q1 = forexWidget.elementsCache.newOrder
      //       .find('[data-type="quantity"]')
      //       .text()
      //       .replace(/,/g, "");
      //   if (widgets.user.forexModeId == 3) {
      //     swapRates.swapBuy = (
      //       (quantity *
      //         (helper.getGlobalSetting("DisplaySwapNumbers")
      //           ? parseFloat(
      //               forexHelper.swapRates[widget.selectedAsset.id].swapLong
      //             )
      //           : (forexHelper.assetsPrices[widget.selectedAsset.id].ask *
      //               parseFloat(
      //                 forexHelper.swapRates[widget.selectedAsset.id].swapLong
      //               )) /
      //             100)) /
      //       widget.selectedAsset.rate
      //     ).toFixed(2);
      //     swapRates.swapSell = 0.0;
      //   } else {
      //     swapRates.swapBuy = (
      //       (q1 *
      //         (helper.getGlobalSetting("DisplaySwapNumbers")
      //           ? parseFloat(
      //               forexHelper.swapRates[widget.selectedAsset.id].swapLong
      //             )
      //           : (forexHelper.assetsPrices[widget.selectedAsset.id].ask *
      //               parseFloat(
      //                 forexHelper.swapRates[widget.selectedAsset.id].swapLong
      //               )) /
      //             100)) /
      //       widget.selectedAsset.rate
      //     ).toFixed(2);
      //     if (q1 < q0) {
      //       var localSellSwap = (
      //         (q0 *
      //           (helper.getGlobalSetting("DisplaySwapNumbers")
      //             ? parseFloat(
      //                 forexHelper.swapRates[widget.selectedAsset.id].swapLong
      //               )
      //             : (forexHelper.assetsPrices[widget.selectedAsset.id].ask *
      //                 parseFloat(
      //                   forexHelper.swapRates[widget.selectedAsset.id].swapLong
      //                 )) /
      //               100)) /
      //         widget.selectedAsset.rate
      //       ).toFixed(2);
      //       swapRates.swapSell =
      //         swapRates.swapBuy - localSellSwap > 0
      //           ? (swapRates.swapBuy - localSellSwap).toFixed(2)
      //           : 0.0;
      //     } else if (q1 == q0) {
      //       swapRates.swapSell = 0.0;
      //     } else {
      //       swapRates.swapSell = (
      //         ((q1 - q0) *
      //           (helper.getGlobalSetting("DisplaySwapNumbers")
      //             ? parseFloat(
      //                 forexHelper.swapRates[widget.selectedAsset.id].swapShort
      //               )
      //             : (forexHelper.assetsPrices[widget.selectedAsset.id].ask *
      //                 parseFloat(
      //                   forexHelper.swapRates[widget.selectedAsset.id].swapShort
      //                 )) /
      //               100)) /
      //         widget.selectedAsset.rate
      //       ).toFixed(2);
      //     }
      //   }
      // } else {
      //   var p = forexHelper.assetsPrices[widget.selectedAsset.id].bid,
      //     q0 = widget.currentlyModifiedOrder.volume,
      //     q1 = forexWidget.elementsCache.newOrder
      //       .find('[data-type="quantity"]')
      //       .text()
      //       .replace(/,/g, "");
      //   if (widgets.user.forexModeId == 3) {
      //     swapRates.swapBuy = 0.0;
      //     swapRates.swapSell = (
      //       (quantity *
      //         (helper.getGlobalSetting("DisplaySwapNumbers")
      //           ? parseFloat(
      //               forexHelper.swapRates[widget.selectedAsset.id].swapShort
      //             )
      //           : (forexHelper.assetsPrices[widget.selectedAsset.id].bid *
      //               parseFloat(
      //                 forexHelper.swapRates[widget.selectedAsset.id].swapShort
      //               )) /
      //             100)) /
      //       widget.selectedAsset.rate
      //     ).toFixed(2);
      //   } else {
      //     swapRates.swapSell = (
      //       (q1 *
      //         (helper.getGlobalSetting("DisplaySwapNumbers")
      //           ? parseFloat(
      //               forexHelper.swapRates[widget.selectedAsset.id].swapShort
      //             )
      //           : (forexHelper.assetsPrices[widget.selectedAsset.id].bid *
      //               parseFloat(
      //                 forexHelper.swapRates[widget.selectedAsset.id].swapShort
      //               )) /
      //             100)) /
      //       widget.selectedAsset.rate
      //     ).toFixed(2);
      //     if (q1 < q0) {
      //       var localBuySwap = (
      //         (q0 *
      //           (helper.getGlobalSetting("DisplaySwapNumbers")
      //             ? parseFloat(
      //                 forexHelper.swapRates[widget.selectedAsset.id].swapShort
      //               )
      //             : (forexHelper.assetsPrices[widget.selectedAsset.id].bid *
      //                 parseFloat(
      //                   forexHelper.swapRates[widget.selectedAsset.id].swapShort
      //                 )) /
      //               100)) /
      //         widget.selectedAsset.rate
      //       ).toFixed(2);
      //       swapRates.swapBuy =
      //         swapRates.swapSell - localBuySwap > 0
      //           ? (swapRates.swapSell - localBuySwap).toFixed(2)
      //           : 0.0;
      //     } else if (q1 == q0) {
      //       swapRates.swapBuy = 0.0;
      //     } else {
      //       swapRates.swapBuy = (
      //         ((q1 - q0) *
      //           (helper.getGlobalSetting("DisplaySwapNumbers")
      //             ? parseFloat(
      //                 forexHelper.swapRates[widget.selectedAsset.id].swapLong
      //               )
      //             : (forexHelper.assetsPrices[widget.selectedAsset.id].bid *
      //                 parseFloat(
      //                   forexHelper.swapRates[widget.selectedAsset.id].swapLong
      //                 )) /
      //               100)) /
      //         widget.selectedAsset.rate
      //       ).toFixed(2);
      //     }
      //   }
      // }
    }

    return swapRates;
  };

  const calculatePipPrice = (minQuantity) => {
    var quantity = minQuantity
      ? parseFloat(minQuantity)
      : selectedAsset.MinQuantity;

    quantity = convertUnits(
      parseFloat(quantityValue),
      selectedAsset.id,
      true,
      settings
    );

    var pip =
        (quantity * Math.pow(10, -selectedAsset.accuracy)) / selectedAsset.rate,
      formattedPip = pip.toFixed(5);

    return parseFloat(formattedPip) == 0 ? 0.00001 : formattedPip;
  };

  const initOrderInfo = () => {
    let sellMargin = calculateMarginRequired(),
      buyMargin = sellMargin,
      margin = calculateMarginRequiredNetting(),
      buyLeverage,
      sellLeverage,
      sellSwap,
      buySwap,
      pip = parseFloat(calculatePipPrice()),
      point = pip < 0.001 ? "~0.001" : pip.toFixed(pip >= 0.01 ? 2 : 3);

    if (margin) {
      buyMargin = margin.buyMargin;
      sellMargin = margin.sellMargin;
    }

    if (showLeverageInfo) {
      buyLeverage = selectedAsset.leverage;
      sellLeverage = selectedAsset.leverage;
    } else {
      var swapRates = calculateSwap();

      if (swapRates != undefined) {
        sellSwap = swapRates.swapSell;
        buySwap = swapRates.swapBuy;
      }
    }

    setOrderInfo((prevState) => ({
      ...prevState,
      marginSell: sellMargin,
      marginBuy: buyMargin,
      leverageSell: sellLeverage,
      leverageBuy: buyLeverage,
      swapSell: sellSwap,
      swapBuy: buySwap,
      pipSell: point,
      pipBuy: point,
    }));
  };
  useEffect(() => {
    if (quantityValue) {
      initOrderInfo();
    }
  }, [quantityValue]);

  return state ? (
    <View style={styles.container}>
      <View>
        <Typography
          style={styles.label}
          name="small"
          text={t("common-labels.margin")}
        />
        <Typography
          style={styles.label}
          name="small"
          text={t("common-labels.swap")}
        />
        <Typography
          style={styles.label}
          name="small"
          text={t("common-labels.point")}
        />
      </View>
      <View>
        <Typography style={styles.buy} name="small" text={state.marginBuy} />
        <Typography style={styles.buy} name="small" text={state.leverageBuy} />
        <Typography style={styles.buy} name="small" text={state.pipBuy} />
      </View>
      <View>
        <Typography style={styles.sell} name="small" text={state.marginSell} />
        <Typography
          style={styles.sell}
          name="small"
          text={state.leverageSell}
        />
        <Typography style={styles.sell} name="small" text={state.pipSell} />
      </View>
    </View>
  ) : null;
};

export default OrderInfo;
