import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

import Typography from "../../Typography/Typography";
import { colors } from "../../../constants";
import dropdownArrow from "../../../assets/svg/realForex/dropdownArrow";
import {
  getSelectedAsset,
  getCurrentTrade,
  getRealForexTradingSettings,
  setCurrentTrade,
  getRealForexPrices,
} from "../../../store/realForex";
import {
  formatDeciamlWithComma,
  convertUnits,
  getSpreadValue,
} from "../../../store/realForex/helpers";

import styles from "./quantityInputStyles";

const QuantityInput = ({ value, setQuantity, state, setState, isMarket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));

  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const [dropdownValues, setDropdownValues] = useState([]);
  const [isFocused, setFocus] = useState(false);
  const [min, setMin] = useState([]);
  const [max, setMax] = useState([]);

  // Init Quantity Input
  const initQuantityInput = () => {
    setMin(selectedAsset.MinQuantity);
    setMax(selectedAsset.MaxQuantity);
  };
  // Create Dropwdown
  const createQuantityDropDown = () => {
    const multiplyBy = selectedAsset.quantityMultiplier.split(",");
    const minQuantity =
      selectedAsset.MinQuantity != 0 ? selectedAsset.MinQuantity : 1;
    const dropdownData = [];

    multiplyBy.forEach(function (qty, n) {
      if (parseFloat(qty) * minQuantity > selectedAsset.MaxQuantity) {
        dropdownData.push(formatDeciamlWithComma(selectedAsset.MaxQuantity));
      } else {
        dropdownData.push(
          formatDeciamlWithComma(parseFloat(qty) * minQuantity)
        );
      }
    });
    if (dropdownData.length > 0) {
      setDropdownValues(dropdownData);
      setDropdownVisibility(!isDropdownVisible);
    }
  };

  const onEndEditing = (event) => {
    setFocus(false);
    let value = event.nativeEvent.text;

    if (value == "") {
      value = 0;
      setQuantity(formatDeciamlWithComma(value));
      return;
    }

    const quantity =
      value.indexOf(",") > -1
        ? value
        : formatDeciamlWithComma(parseFloat(value));

    if (parseFloat(value) > parseFloat(max)) {
      setQuantity(formatDeciamlWithComma(parseFloat(max)));

      Toast.show({
        type: "error",
        text1: `The maximum quantity you can trade is ${max} units.'`,
        topOffset: 100,
        visibilityTime: 3000,
        autoHide: true,
      });
    } else if (parseFloat(value) < parseFloat(min)) {
      setQuantity(formatDeciamlWithComma(parseFloat(min)));
      Toast.show({
        type: "error",
        text1: `The minimum quantity you can trade is ${min}`,
        topOffset: 100,
        visibilityTime: 3000,
        autoHide: true,
      });
    } else {
      setQuantity(quantity);
      updateTPandSL(value);
    }
    currentTrade.quantity = parseFloat(value);
    setDropdownVisibility(false);
    setCurrentTrade(dispatch, currentTrade);
  };

  const onChange = (value) => {
    if (!value) {
      setQuantity("");
      return;
    }
    const quantity =
      value.indexOf(",") > -1
        ? convertUnits(
            parseFloat(value.replace(/,/g, "")),
            selectedAsset.id,
            true,
            settings
          )
        : convertUnits(parseFloat(value), selectedAsset.id, true, settings);
    setQuantity(quantity.toString());
  };

  const onFocus = () => {
    setFocus(true);
    setDropdownVisibility(false);
    if (!value) {
      setQuantity("");
      return;
    }

    const quantity =
      value.indexOf(",") > -1
        ? convertUnits(
            parseFloat(value.replace(/,/g, "")),
            selectedAsset.id,
            true,
            settings
          )
        : convertUnits(parseFloat(value), selectedAsset.id, true, settings);
    setQuantity(quantity.toString());
  };

  const quantityDropdownPick = (value) => {
    const quantity =
      value.indexOf(",") > -1
        ? convertUnits(
            parseFloat(value.replace(/,/g, "")),
            selectedAsset.id,
            true,
            settings
          )
        : convertUnits(parseFloat(value), selectedAsset.id, true, settings);

    currentTrade.quantity = quantity;

    setQuantity(value);
    setDropdownVisibility(false);
    updateTPandSL(quantity);

    setCurrentTrade(dispatch, currentTrade);
  };

  const updateTPandSL = (value) => {
    if (isMarket) {
      if (state.TPActive) {
        const TPAmountMin = (
          parseFloat(selectedAsset.distance).toFixed(selectedAsset.accuracy) *
          convertUnits(parseFloat(value), selectedAsset.id, true, settings) *
          parseFloat(1 / selectedAsset.rate)
        ).toFixed(2);

        if (parseFloat(state.takeProfitAmount) < parseFloat(TPAmountMin)) {
          const TPDistance = (
            parseFloat(value) /
            ((currentTrade.quantity * 1) / selectedAsset.rate)
          ).toFixed(selectedAsset.accuracy);

          setState((prevState) => ({
            ...prevState,
            takeProfitAmount: parseFloat(TPAmountMin),
            takeProfitDistance: parseFloat(TPDistance),
            takeProfitAmountMin: parseFloat(TPAmountMin),
          }));
        }
      }
      if (state.SLActive) {
        const SlAmountMax = (
          -parseFloat(
            (
              parseFloat(
                getSpreadValue(
                  realForexPrices[selectedAsset.id].ask,
                  realForexPrices[selectedAsset.id].bid,
                  realForexPrices[selectedAsset.id].accuracy
                ) * Math.pow(10, -realForexPrices[selectedAsset.id].accuracy)
              ) + parseFloat(selectedAsset.distance)
            ).toFixed(selectedAsset.accuracy)
          ) *
          convertUnits(parseFloat(value), selectedAsset.id, true, settings) *
          parseFloat(1 / selectedAsset.rate)
        ).toFixed(2);

        if (parseFloat(state.stopLossAmount) > parseFloat(SlAmountMax)) {
          const SLDistance = Math.abs(
            parseFloat(value) /
              ((currentTrade.quantity * 1) / selectedAsset.rate)
          ).toFixed(selectedAsset.accuracy);

          setState((prevState) => ({
            ...prevState,
            stopLossAmount: parseFloat(SlAmountMax),
            stopLossDistance: parseFloat(SLDistance),
            stopLossAmountMax: parseFloat(SlAmountMax),
          }));
        }
      }
    } else {
      if (state.pendingTPActive) {
        const pendingTPAmountMin = (
          parseFloat(selectedAsset.distance).toFixed(selectedAsset.accuracy) *
          convertUnits(parseFloat(value), selectedAsset.id, false, settings) *
          parseFloat(1 / selectedAsset.rate)
        ).toFixed(2);

        if (
          parseFloat(state.pendingTPAmount) < parseFloat(pendingTPAmountMin)
        ) {
          const pendingTPDistance = (
            parseFloat(pendingTPAmountMin) /
            ((convertUnits(
              parseFloat(value),
              selectedAsset.id,
              true,
              settings
            ) *
              1) /
              selectedAsset.rate)
          ).toFixed(selectedAsset.accuracy);

          setState((prevState) => ({
            ...prevState,
            pendingTPAmount: parseFloat(pendingTPAmountMin),
            pendingTPDistance: parseFloat(pendingTPDistance),
            pendingTPAmountMin: parseFloat(pendingTPAmountMin),
          }));
        }
      }

      if (state.pendingSLActive) {
        const pendingSLAmountMax = (
          parseFloat(
            getSpreadValue(
              realForexPrices[selectedAsset.id].ask,
              realForexPrices[selectedAsset.id].bid,
              realForexPrices[selectedAsset.id].accuracy
            ) * Math.pow(10, -realForexPrices[selectedAsset.id].accuracy)
          ) + parseFloat(selectedAsset.distance)
        ).toFixed(selectedAsset.accuracy);

        if (
          parseFloat(state.pendingSLAmount) > parseFloat(pendingSLAmountMax)
        ) {
          const pendingSLDistance = Math.abs(
            parseFloat(pendingSLAmountMax) /
              ((convertUnits(
                parseFloat(value),
                selectedAsset.id,
                true,
                settings
              ) *
                1) /
                selectedAsset.rate)
          ).toFixed(selectedAsset.accuracy);

          setState((prevState) => ({
            ...prevState,
            pendingSLAmount: parseFloat(pendingSLAmountMax),
            pendingSLDistance: parseFloat(pendingSLDistance),
            pendingSLAmountMax: parseFloat(pendingSLAmountMax),
          }));
        }
      }
    }
  };

  useEffect(() => {
    if (selectedAsset) {
      initQuantityInput();
    }
  }, [selectedAsset]);

  return (
    <View style={styles.inputsWrapper}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.quantity")}
      />
      <View style={styles.quantityInputWrapper}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onEndEditing={(value) => onEndEditing(value)}
          onChangeText={onChange}
          value={value}
          placeholder="Quantity"
          placeholderTextColor={colors.fontSecondaryColor}
          style={styles.quantityInput}
          onFocus={onFocus}
          keyboardType="numeric"
        />
        {!isFocused ? (
          <TouchableHighlight
            style={styles.dropdownArrowWrapper}
            onPress={createQuantityDropDown}
            activeOpacity={0.1}
            underlayColor={colors.white}
          >
            <SvgXml
              styles={styles.dropdownArrow}
              xml={dropdownArrow}
              width="32"
              height="32"
            />
          </TouchableHighlight>
        ) : null}
        {isDropdownVisible ? (
          <View style={styles.quantityDropdown}>
            {dropdownValues.map((value, index) => {
              return (
                <TouchableOpacity
                  key={`${index}`}
                  style={styles.value}
                  onPress={() => quantityDropdownPick(value)}
                  underlayColor={colors.containerBackground}
                >
                  <Typography name="normal" text={value} />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default QuantityInput;
