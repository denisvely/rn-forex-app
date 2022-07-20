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
import { colors } from "../../../../constants";
import dropdownArrow from "../../../../assets/svg/realForex/dropdownArrow";
import {
  formatCurrency,
  getCurrencySymbol,
} from "../../../FormatedCurrency/helpers";

import styles from "./takeProfitSimplexStyles";

const TakeProfitSimplex = ({ value, setValue, takeProfitDDL, disabled }) => {
  const { t } = useTranslation();
  const [isFocused, setFocus] = useState(false);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const user = useSelector((state) => getUser(state));
  const settings = useSelector((state) => getSettings(state));

  const onEndEditing = (event) => {
    setFocus(false);
    let amount = event.nativeEvent.text;

    setValue(parseInt(amount));
    setDropdownVisibility(false);
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

    setValue(`${value}`);
  };

  const openDropdown = () => {
    if (takeProfitDDL && takeProfitDDL.length > 0) {
      setDropdownVisibility(!isDropdownVisible);
    }
  };

  const takeProfitDropdownPick = (value) => {
    setValue(`${value}`);
    setDropdownVisibility(false);
  };

  return (
    <View style={{ ...styles.inputsWrapper, opacity: disabled ? 0.2 : 1 }}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("common-labels.takeProfit")}
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
            value && !isFocused
              ? formatCurrency(getCurrencySymbol(user), value, false, settings)
              : ""
          }
          placeholder={t("common-labels.takeProfit")}
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
            {takeProfitDDL.map((value, index) => {
              return (
                <TouchableOpacity
                  key={`${index}`}
                  style={styles.value}
                  onPress={() => takeProfitDropdownPick(value)}
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
export default TakeProfitSimplex;
