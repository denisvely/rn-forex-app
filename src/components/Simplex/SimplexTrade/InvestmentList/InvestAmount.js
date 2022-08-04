import React, { useState } from "react";
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
  formatCurrency,
  getCurrencySymbol,
} from "../../../FormatedCurrency/helpers";
import { getSettings, getUser } from "../../../../store/app";
import { colors } from "../../../../constants";
import {
  Typography,
  FormattedTypographyWithCurrency,
} from "../../../../components";
import { getSimplexTradingSettings } from "../../../../store/simplex";
import dropdownArrow from "../../../../assets/svg/realForex/dropdownArrow";

import styles from "./investmentListStyles";

const InvestAmount = ({
  investmentSelected,
  setInvestmentSelected,
  investmentDropdownData,
  disabled,
}) => {
  const { t } = useTranslation();
  const [isFocused, setFocus] = useState(false);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const user = useSelector((state) => getUser(state));
  const settings = useSelector((state) => getSettings(state));
  const simplexTradingSettings = useSelector((state) =>
    getSimplexTradingSettings(state)
  );

  const onEndEditing = (event) => {
    setFocus(false);
    let amount = event.nativeEvent.text;

    if (
      parseInt(amount) >
      parseInt(simplexTradingSettings.MaxInvest) * user.currencyFactor
    ) {
      setInvestmentSelected(
        parseInt(simplexTradingSettings.MaxInvest) * user.currencyFactor
      );

      Toast.show({
        type: "error",
        text1: `The maximum investment amount is ${
          parseInt(simplexTradingSettings.MaxInvest) * user.currencyFactor
        }`,
        topOffset: 100,
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    } else if (
      parseInt(amount) <
        parseInt(simplexTradingSettings.MinInvest) * user.currencyFactor ||
      amount == ""
    ) {
      setInvestmentSelected(
        parseInt(simplexTradingSettings.MinInvest) * user.currencyFactor
      );
      Toast.show({
        type: "error",
        text1: `The minimum investment amount is ${
          parseInt(simplexTradingSettings.MinInvest) * user.currencyFactor
        }`,
        topOffset: 100,
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    setInvestmentSelected(parseInt(amount));
    setDropdownVisibility(false);
  };

  const onChange = (value) => {
    if (!value) {
      setInvestmentSelected("");
      return;
    }

    setInvestmentSelected(value);
  };

  const onFocus = () => {
    setFocus(true);
    setDropdownVisibility(false);
    if (!investmentSelected) {
      setInvestmentSelected("");
      return;
    }

    setInvestmentSelected(investmentSelected);
  };

  const openDropdown = () => {
    if (investmentDropdownData && investmentDropdownData.length > 0) {
      setDropdownVisibility(!isDropdownVisible);
    }
  };

  const quantityDropdownPick = (value) => {
    setInvestmentSelected(`${value}`);
    setDropdownVisibility(false);
  };

  return (
    <View style={{ ...styles.inputsWrapper, opacity: disabled ? 0.2 : 1 }}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("easyForex.investAmount")}
      />
      <View style={styles.quantityInputWrapper}>
        <TextInput
          editable={disabled ? false : true}
          keyboardType="numeric"
          selectTextOnFocus={disabled ? false : true}
          autoCapitalize="none"
          autoCorrect={false}
          onEndEditing={(value) => onEndEditing(value)}
          onChangeText={onChange}
          value={
            investmentSelected && !isFocused
              ? formatCurrency(
                  getCurrencySymbol(user),
                  investmentSelected,
                  false,
                  settings
                )
              : investmentSelected
              ? investmentSelected
              : ""
          }
          placeholder="Quantity"
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
            {investmentDropdownData.map((value, index) => {
              return (
                <TouchableOpacity
                  key={`${index}`}
                  style={styles.value}
                  onPress={() => quantityDropdownPick(value)}
                  underlayColor={colors.containerBackground}
                >
                  <FormattedTypographyWithCurrency name="normal" text={value} />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default InvestAmount;
