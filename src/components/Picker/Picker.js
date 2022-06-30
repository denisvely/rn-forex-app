import React, { useRef } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
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
    // paddingHorizontal: 9,
    marginBottom: 16,
    paddingRight: 30,
    width: "100%",
  },
  placeholderColor: "red",
  underline: { borderTopWidth: 0 },
  icon: {
    right: 15,
    top: 12.5,
  },
};

const Picker = ({ value = "", placeholderText, styles, onChange, values }) => {
  const pickerRef = useRef(false);

  return values ? (
    <View style={{ width: "100%" }}>
      <RNPickerSelect
        ref={pickerRef}
        value={value}
        placeholder={{ ...placeholderText }}
        onValueChange={(itemValue) => {
          onChange(itemValue);
        }}
        itemKey={values.itemKey}
        style={{ ...pickerStyle, ...styles }}
        items={values}
        useNativeAndroidPickerStyle={false}
        fixAndroidTouchableBug={true}
        Icon={() => {
          return (
            <AntDesign
              name="down"
              size={20}
              color={colors.fontSecondaryColor}
              style={pickerStyle.icon}
            />
          );
        }}
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
