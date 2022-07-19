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
import dropdownArrow from "../../../../assets/svg/realForex/dropdownArrow";

import styles from "./investmentListStyles";

const InvestAmount = ({
  investmentSelected,
  setInvestmentSelected,
  investmentDropdownData,
  setInvestmentDropdownData,
  disabled,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isFocused, setFocus] = useState(false);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const onEndEditing = (event) => {
    setFocus(false);
  };
  const user = useSelector((state) => getUser(state));
  const settings = useSelector((state) => getSettings(state));

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
    if (investmentDropdownData.length > 0) {
      setDropdownVisibility(!isDropdownVisible);
    }
  };

  const quantityDropdownPick = (value) => {
    setInvestmentSelected(`${value}`);
    setDropdownVisibility(false);
    // TODO
    // updateTPandSL(quantity);
    // setCurrentTrade(dispatch, currentTrade);
  };

  return (
    <View style={{ ...styles.inputsWrapper, opacity: disabled ? 0.5 : 1 }}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("easyForex.investAmount")}
      />
      <View style={styles.quantityInputWrapper}>
        <TextInput
          editable={disabled ? false : true}
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
              : investmentSelected.toString()
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
