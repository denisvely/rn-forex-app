import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableHighlight } from "react-native";
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
} from "../../../store/realForex";
import {
  formatDeciamlWithComma,
  convertUnits,
} from "../../../store/realForex/helpers";
import styles from "./quantityInputStyles";

const QuantityInput = ({ value, setQuantity }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));
  const currentTrade = useSelector((state) => getCurrentTrade(state));
  const settings = useSelector((state) => getRealForexTradingSettings(state));

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
      });
    } else if (parseFloat(value) < parseFloat(min)) {
      setQuantity(formatDeciamlWithComma(parseFloat(min)));
      Toast.show({
        type: "error",
        text1: `The minimum quantity you can trade is ${min}`,
        topOffset: 100,
      });
    } else {
      setQuantity(quantity);
      // TODO => TP & SL => forex.js - line 4244
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

  const onFocus = (event) => {
    setFocus(true);
    setDropdownVisibility(false);
    let value = event.nativeEvent.text;

    if (!value) {
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

    setCurrentTrade(dispatch, currentTrade);
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
          // keyboardType="number-pad"
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
                <TouchableHighlight
                  key={`${index}`}
                  style={styles.value}
                  onPress={() => quantityDropdownPick(value)}
                  underlayColor={colors.containerBackground}
                >
                  <Typography name="normal" text={value} />
                </TouchableHighlight>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default QuantityInput;
