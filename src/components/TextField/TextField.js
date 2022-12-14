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
  editable,
  isTextArea = false,
  onSubmitEditing,
  keyboardType,
  style,
}) => {
  return (
    <View style={styles.textFieldWrapper}>
      {hasIcon ? (
        <View style={styles.iconWrapper}>
          <SvgXml xml={textFieldIcons[type][0]} height={40} width={32} />
        </View>
      ) : null}
      <TextInput
        numberOfLines={isTextArea ? 10 : 1}
        multiline={isTextArea}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        keyboardType={keyboardType}
        style={{ ...styles.input, ...style }}
        secureTextEntry={secureTextEntry}
        editable={editable}
        onSubmitEditing={onSubmitEditing}
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
