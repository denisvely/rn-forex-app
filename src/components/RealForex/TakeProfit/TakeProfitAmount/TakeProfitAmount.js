import React, { useState } from "react";
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
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const user = useSelector((state) => getUser(state));
  const globalSettings = useSelector((state) => getSettings(state));
  const [isErrorActive, setErrorState] = useState(false);
  const spinnerMin = (
      parseFloat(
          parseFloat(selectedAsset.distance).toFixed(selectedAsset.accuracy)
      ) *
      currentTrade.quantity *
      parseFloat(1 / selectedAsset.rate)
  ).toFixed(2);

  const recalculateTPAmount = (value) => {
    if (value) {
      const TPDistance = (
          parseFloat(value) /
          ((currentTrade.quantity * 1) / selectedAsset.rate)
      ).toFixed(selectedAsset.accuracy);

      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: parseFloat(TPDistance),
        takeProfitAmount: parseFloat(value),
      }));
    }
  };

  const onChange = (value) => {
    if (value) {
      if (state.takeProfitAmount) {
        if (parseFloat(value) < parseFloat(spinnerMin)) {
          setErrorState(true);
          Toast.show({
            type: "error",
            text1: `TP Amount must be higher than ${formatCurrency(
                user.currencySymbol,
                parseFloat(spinnerMin).toFixed(2),
                true,
                globalSettings
            )}`,
            visibilityTime: 3000,
            autoHide: true,
          });

          recalculateTPAmount(spinnerMin);
          return;
        } else {
          setErrorState(false);
        }
      } else {
        const TPAmount = (
            parseFloat(selectedAsset.distance) *
            3 *
            currentTrade.quantity *
            parseFloat(1 / selectedAsset.rate)
        ).toFixed(2);

        const TPDistance = (parseFloat(selectedAsset.distance) * 3).toFixed(
            selectedAsset.accuracy
        );

        setState((prevState) => ({
          ...prevState,
          takeProfitDistance: parseFloat(TPDistance),
          takeProfitAmount: parseFloat(TPAmount),
          takeProfitAmountMin: spinnerMin,
          TPActive: true,
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        takeProfitDistance: null,
        takeProfitAmount: null,
        TPActive: false,
      }));
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
          errorActive={isErrorActive}
          placeholder={t("common-labels.amount")}
          spinnerValue={state.takeProfitAmount}
          onSpinnerChange={(value) => onChange(value)}
          step={0.01}
          accuracy={2}
      />
  ) : null;
};

export default TakeProfitAmount;
