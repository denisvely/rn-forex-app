import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import Spinner from "../../../Spinner/Spinner";
import Typography from "../../../Typography/Typography";
import {
    getSelectedAsset,
    getRealForexPrices,
    getCurrentTrade,
    getRealForexTradingSettings,
} from "../../../../store/realForex";
import {getUser} from "../../../../store/app";
import {convertUnits} from "../../../../store/realForex/helpers";

const TakeProfitAmount = ({state, setState}) => {
    const {t} = useTranslation();
    const selectedAsset = useSelector((state) => getSelectedAsset(state));
    const realForexPrices = useSelector((state) => getRealForexPrices(state));
    const currentTrade = useSelector((state) => getCurrentTrade(state));
    const settings = useSelector((state) => getRealForexTradingSettings(state));
    const user = useSelector((state) => getUser(state));
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
                takeProfitAmount: parseFloat(value),
                takeProfitPrice: parseFloat(TPRate),
                TPActive: true,
            }));
        }
    };

    const onChange = (value) => {
        if (value) {
            recalculateTPAmount(value);
        } else {
            // spinnerOnStart(value);
        }
    };

    return selectedAsset ? (
        <Spinner
            prepend={
                state.TPActive ? (
                    <Typography
                        name="normal"
                        text={user.currencySymbol}
                        style={{position: "absolute", left: "35%", top: 18}}
                    />
                ) : null
            }
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
