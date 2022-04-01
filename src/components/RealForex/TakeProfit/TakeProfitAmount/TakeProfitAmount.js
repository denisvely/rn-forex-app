import React from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import Spinner from "../../../Spinner/Spinner";
import Typography from "../../../Typography/Typography";
import {
  getSelectedAsset,
  getRealForexPrices,
  getCurrentTrade,
  getRealForexTradingSettings,
} from "../../../../store/realForex";
import { getUser, getSettings } from "../../../../store/app";
import { convertUnits, getSpread } from "../../../../store/realForex/helpers";
import { colors } from "../../../../constants";
import { formatCurrency } from "../../../FormatedCurrency/helpers";

const TakeProfitAmount = ({ state, setState }) => {
  const { t } = useTranslation();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const user = useSelector((state) => getUser(state));
  const globalSettings = useSelector((state) => getSettings(state));
  const spinnerMin = (
    parseFloat(selectedAsset.minTPDistance) *
    convertUnits(
      parseFloat(currentTrade.quantity),
      selectedAsset.id,
      true,
      settings
    ) *
    parseFloat(1 / selectedAsset.rate)
  ).toFixed(2);

  const recalculateTPAmount = (value) => {
    if (value) {
      let TPRate = "";
      let TPDistance = (
        parseFloat(value) /
        ((convertUnits(
          parseFloat(currentTrade.quantity),
          selectedAsset.id,
          true,
          settings
        ) *
          1) /
          selectedAsset.rate)
      ).toFixed(selectedAsset.accuracy);

      if (currentTrade.isBuy) {
        TPRate = parseFloat(
          parseFloat(realForexPrices[selectedAsset.id].ask) +
            parseFloat(TPDistance)
        ).toFixed(realForexPrices[selectedAsset.id].accuracy);
      } else {
        TPRate = parseFloat(
          parseFloat(realForexPrices[selectedAsset.id].bid) -
            parseFloat(TPDistance)
        ).toFixed(realForexPrices[selectedAsset.id].accuracy);
      }

      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: parseFloat(TPDistance),
        takeProfitPrice: parseFloat(TPRate),
        takeProfitAmount: parseFloat(value),
        TPActive: true,
        isPriceFocused: false,
      }));
    }
  };

  const onChange = (value) => {
    if (value) {
      if (state.takeProfitAmount) {
        if (parseFloat(value) < parseFloat(spinnerMin)) {
          Toast.show({
            type: "error",
            text1: `TP Amount must be higher than ${formatCurrency(
              user.currencySymbol,
              parseFloat(spinnerMin).toFixed(2),
              true,
              globalSettings
            )}`,
          });

          recalculateTPAmount(state.takeProfitAmount);
          return;
        }
      }

      let TPAmount;
      if (currentTrade.isBuy) {
        const TPRate =
          parseFloat(realForexPrices[selectedAsset.id].ask) +
          parseFloat(selectedAsset.distance) +
          parseFloat(
            10 *
              parseFloat(
                getSpread(
                  realForexPrices[selectedAsset.id].ask,
                  realForexPrices[selectedAsset.id].bid,
                  realForexPrices[selectedAsset.id].accuracy
                )
              )
          );
        // TP Distance = Math.abs(TP Rate - ASK Price)
        const TPDistance = Math.abs(
          TPRate - parseFloat(realForexPrices[selectedAsset.id].ask)
        );
        TPAmount = (
          parseFloat(TPDistance) *
          convertUnits(
            parseFloat(currentTrade.quantity),
            selectedAsset.id,
            true,
            settings
          ) *
          parseFloat(1 / selectedAsset.rate)
        ).toFixed(2);
      } else {
        var TPRate =
          parseFloat(realForexPrices[selectedAsset.id].bid) -
          parseFloat(selectedAsset.distance) -
          parseFloat(
            10 *
              parseFloat(
                getSpread(
                  realForexPrices[selectedAsset.id].ask,
                  realForexPrices[selectedAsset.id].bid,
                  realForexPrices[selectedAsset.id].accuracy
                )
              )
          );
        // TP Distance = Math.abs(TP Rate  - BID Price)
        var TPDistance = Math.abs(
          TPRate - parseFloat(realForexPrices[selectedAsset.id].bid)
        );
        TPAmount = (
          parseFloat(TPDistance) *
          convertUnits(
            parseFloat(currentTrade.quantity),
            selectedAsset.id,
            true,
            settings
          ) *
          parseFloat(1 / selectedAsset.rate)
        ).toFixed(2);
      }

      recalculateTPAmount(TPAmount);
    }
  };

  return selectedAsset ? (
    <Spinner
      prepend={
        state.TPActive ? (
          <Typography
            name="normal"
            text={user.currencySymbol}
            style={{ position: "absolute", left: "35%", top: 18 }}
          />
        ) : null
      }
      style={{
        backgroundColor:
          state.TPActive && !state.isPriceFocused
            ? colors.containerBackground
            : colors.white,
      }}
      placeholder={t("common-labels.amount")}
      spinnerValue={state.takeProfitAmount}
      onSpinnerChange={(value) => onChange(value)}
      step={0.01}
      accuracy={2}
      // min={state.TPActive && parseFloat(spinnerMin)}
    />
  ) : null;
};

export default TakeProfitAmount;
