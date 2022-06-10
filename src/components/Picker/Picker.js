import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";
import { SvgXml } from "react-native-svg";
import dropdownArrow from "../../assets/svg/realForex/dropdownArrow";

import { colors } from "../../constants";

const pickerStyle = {
  inputIOS: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.fontPrimaryColor,
    paddingRight: 30,
    height: 44,
    paddingVertical: 11,
    paddingHorizontal: 9,
    marginBottom: 16,
    paddingRight: 30,
  },
  inputAndroid: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.fontPrimaryColor,
    paddingRight: 30,
    height: 44,
    paddingVertical: 11,
    paddingHorizontal: 9,
    marginBottom: 16,
    paddingRight: 30,
    width: "100%",
  },
  placeholderColor: "red",
  underline: { borderTopWidth: 0 },
  icon: {
    width: 32,
    height: 32,
    position: "absolute",
    right: 8,
    top: 0,
  },
};

const Picker = ({ value = "", placeholderText, styles, onChange, values }) => {
  return values ? (
    <View style={{ width: "100%" }}>
      <RNPickerSelect
        value={value}
        placeholder={{ ...placeholderText }}
        onValueChange={(itemValue) => {
          onChange(itemValue);
        }}
        useNativeAndroidPickerStyle={false}
        style={{ ...pickerStyle, ...styles }}
        items={values}
      />
      <SvgXml
        xml={dropdownArrow}
        width="32"
        height="32"
        style={pickerStyle.icon}
      />
    </View>
  ) : null;
};

Picker.propTypes = {
  value: PropTypes.string,
  placeholderText: PropTypes.string,
  styles: PropTypes.object,
  onChange: PropTypes.func,
  values: PropTypes.array,
};

export default Picker;
