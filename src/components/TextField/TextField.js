import React from "react";
import PropTypes from "prop-types";
import { TextInput, View } from "react-native";
import { SvgXml } from "react-native-svg";
import textFieldIcons from "./textFieldIcons";
import styles from "./textFieldStyles";

const TextField = ({
  value,
  type,
  placeholder,
  onChange,
  hasIcon,
  secureTextEntry,
}) => {
  return (
    <View style={styles.textFieldWrapper}>
      {hasIcon && (
        <View style={styles.iconWrapper}>
          <SvgXml xml={textFieldIcons[type][0]} height={40} width={32} />
        </View>
      )}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        keyboardType="email-address"
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

TextField.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  hasIcon: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
};

export default TextField;
