import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import {
  Typography,
  FormattedTypographyWithCurrency,
} from "../../../../components";
import { getSettings, getUser } from "../../../../store/app";
import { getSimplexTradingSettings } from "../../../../store/simplex";
import { colors } from "../../../../constants";
import dropdownArrow from "../../../../assets/svg/realForex/dropdownArrow";
import {
  formatCurrency,
  getCurrencySymbol,
} from "../../../FormatedCurrency/helpers";

import styles from "./stoplossSimplexStyles";

const StopLossSimplex = ({ value, setValue, disabled, investmentSelected }) => {
  const { t } = useTranslation();
  const [isFocused, setFocus] = useState(false);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const [stopLosstDDL, setStopLosstDDL] = useState(null);
  const user = useSelector((state) => getUser(state));
  const settings = useSelector((state) => getSettings(state));
  const simplexTradingSettings = useSelector((state) =>
    getSimplexTradingSettings(state)
  );

  const onEndEditing = (event) => {
    setFocus(false);
    let amount = event.nativeEvent.text;

    if (
      parseInt(amount) <
        (parseInt(simplexTradingSettings.SimpleForexMinStopLoss) *
          investmentSelected) /
          100 ||
      amount == ""
    ) {
      Toast.show({
        type: "error",
        text1: `The minimum stop loss amount is ${
          (parseInt(simplexTradingSettings.SimpleForexMinStopLoss) *
            investmentSelected) /
          100
        }`,
        topOffset: 100,
        visibilityTime: 3000,
        autoHide: true,
      });
      setValue(
        (parseInt(simplexTradingSettings.SimpleForexMinStopLoss) *
          investmentSelected) /
          100
      );
      return;
    }

    if (parseInt(amount) > parseInt(investmentSelected)) {
      Toast.show({
        type: "error",
        text1: `The maximum stop loss amount is ${parseInt(
          investmentSelected
        )}`,
        topOffset: 100,
        visibilityTime: 3000,
        autoHide: true,
      });
      setValue(investmentSelected);
      return;
    }

    setValue(parseInt(amount));
    setDropdownVisibility(false);

    // TODO
    // if (widget.currentAssetSettings.modifyOrder) {
    //   widget.checkModifiedOrder();
    // } else if (widget.currentAssetSettings.modifyPosition) {
    //   widget.checkModifiedPosition();
    // }
  };

  const onChange = (value) => {
    if (!value) {
      setValue("");
      return;
    }

    setValue(value);
  };

  const onFocus = () => {
    setFocus(true);
    setDropdownVisibility(false);
    if (!value) {
      setValue("");
      return;
    }

    setValue(value.toString());
  };

  const openDropdown = () => {
    if (stopLosstDDL && stopLosstDDL.length > 0) {
      setDropdownVisibility(!isDropdownVisible);
    }
  };

  const stopLossDropdownPick = (value) => {
    setValue(`${value}`);
    setDropdownVisibility(false);
  };

  const buildStopLossDDL = () => {
    const ddl = [];
    let delta =
      (100 + parseInt(simplexTradingSettings.SimpleForexMinStopLoss)) / 5;

    ddl.push(
      (parseInt(simplexTradingSettings.SimpleForexMinStopLoss) *
        investmentSelected) /
        100
    );

    ddl.push(
      investmentSelected *
        ((delta -
          (delta % 10) +
          parseInt(simplexTradingSettings.SimpleForexMinStopLoss)) /
          100)
    );
    ddl.push(
      investmentSelected *
        ((2 * (delta - (delta % 10)) +
          parseInt(simplexTradingSettings.SimpleForexMinStopLoss)) /
          100)
    );
    ddl.push(
      investmentSelected *
        ((3 * (delta - (delta % 10)) +
          parseInt(simplexTradingSettings.SimpleForexMinStopLoss)) /
          100)
    );
    ddl.push(investmentSelected);

    setStopLosstDDL(ddl);
  };

  useEffect(() => {
    if (simplexTradingSettings && investmentSelected) {
      buildStopLossDDL();
    }
  }, [investmentSelected]);

  return (
    <View style={{ ...styles.inputsWrapper, opacity: disabled ? 0.5 : 1 }}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.stopLoss")}
      />
      <View style={styles.quantityInputWrapper}>
        <TextInput
          keyboardType="numeric"
          editable={disabled ? false : true}
          selectTextOnFocus={disabled ? false : true}
          autoCapitalize="none"
          autoCorrect={false}
          onEndEditing={(value) => onEndEditing(value)}
          onChangeText={onChange}
          value={
            value && !isFocused
              ? formatCurrency(getCurrencySymbol(user), value, false, settings)
              : value
              ? value
              : ""
          }
          placeholder={t("common-labels.stopLoss")}
          placeholderTextColor={colors.fontSecondaryColor}
          style={styles.quantityInput}
          onFocus={onFocus}
        />
        {!isFocused ? (
          <TouchableHighlight
            style={styles.dropdownArrowWrapper}
            onPress={openDropdown}
            activeOpacity={0.1}
            underlayColor={colors.white}
            disabled={disabled}
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
            {stopLosstDDL.map((value, index) => {
              return (
                <TouchableOpacity
                  key={`${index}`}
                  style={styles.value}
                  onPress={() => stopLossDropdownPick(value)}
                  underlayColor={colors.containerBackground}
                >
                  <FormattedTypographyWithCurrency
                    name="small"
                    text={value}
                    style={{ lineHeight: 15 }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default StopLossSimplex;
