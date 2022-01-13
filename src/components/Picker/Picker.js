import React from "react";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";

const pickerStyle = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 46,
    color: "black",
    paddingRight: 30,
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 46,
    color: "black",
    paddingRight: 30,
    marginTop: 10,
  },
  placeholderColor: "black",
  underline: { borderTopWidth: 0 },
  icon: {
    position: "absolute",
    backgroundColor: "transparent",
    borderTopWidth: 5,
    borderTopColor: "#00000099",
    borderRightWidth: 5,
    borderRightColor: "transparent",
    borderLeftWidth: 5,
    borderLeftColor: "transparent",
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};

const Picker = ({
  value = "",
  placeholderText,
  styles,
  children,
  onChange,
}) => {
  return (
    <RNPickerSelect
      value={value}
      placeholder={{ ...placeholderText, key: 0, color: "gray" }}
      onValueChange={(itemValue) => {
        onChange("title", itemValue);
      }}
      useNativeAndroidPickerStyle={false}
      style={{ ...pickerStyle, ...styles }}
      items={[
        { label: "Mister", itemKey: 1, value: "mister" },
        { label: "Miss", itemKey: 2, value: "miss" },
        { label: "Mrs", itemKey: 3, value: "mrs" },
      ]}
    />
  );
};

Picker.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
  onPress: PropTypes.func,
  color: PropTypes.string,
  linesNumber: PropTypes.number || null,
};

export default Picker;
