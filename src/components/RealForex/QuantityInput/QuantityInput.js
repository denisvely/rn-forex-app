import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableHighlight } from "react-native";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";

import { Typography } from "components";
import { colors } from "constants";
import dropdownArrow from "../../../assets/svg/realForex/dropdownArrow";
import { getSelectedAsset, setSelectedAsset } from "store/realForex";
import { formatDeciamlWithComma } from "store/realForex/helpers";

import styles from "./quantityInputStyles";

const QuantityInput = ({ value, onChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedAsset = useSelector((state) => getSelectedAsset(state));

  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const [dropdownValues, setDropdownValues] = useState([]);

  const displayQuantityDropDown = () => {
    const multiplyBy = selectedAsset.quantityMultiplier.split(",");
    const minQuantity =
      selectedAsset.minQuantity != 0 ? selectedAsset.minQuantity : 1;
    const dropdownData = [];

    multiplyBy.forEach(function (qty, n) {
      if (parseFloat(qty) * minQuantity > selectedAsset.maxQuantity) {
        dropdownData.push(formatDeciamlWithComma(selectedAsset.maxQuantity));
      } else {
        dropdownData.push(
          formatDeciamlWithComma(parseFloat(qty) * minQuantity)
        );
      }
    });
    if (dropdownData.length > 0) {
      setDropdownValues(dropdownData);
    }
  };

  const changeQuantity = (value) => {
    onChange(value);
    setDropdownVisibility(false);
  };

  useEffect(() => {
    if (selectedAsset) {
      displayQuantityDropDown();
    }
  }, []);
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
          onChangeText={onChange}
          value={value}
          placeholder="Quantity"
          placeholderTextColor={colors.fontSecondaryColor}
          style={styles.quantityInput}
          keyboardType="number-pad"
        />
        <TouchableHighlight
          style={styles.dropdownArrowWrapper}
          onPress={() => setDropdownVisibility(!isDropdownVisible)}
          activeOpacity={0.1}
          underlayColor={colors.containerBackground}
        >
          <SvgXml
            styles={styles.dropdownArrow}
            xml={dropdownArrow}
            width="32"
            height="32"
          />
        </TouchableHighlight>
        {isDropdownVisible && (
          <View style={styles.quantityDropdown}>
            {dropdownValues.map((value, index) => {
              return (
                <TouchableHighlight
                  key={`${index}`}
                  style={styles.value}
                  onPress={() => changeQuantity(value)}
                  activeOpacity={0.1}
                  underlayColor={colors.containerBackground}
                >
                  <Typography name="normal" text={value} />
                </TouchableHighlight>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

export default QuantityInput;
