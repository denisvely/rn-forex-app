import React, { useEffect, useRef } from "react";
import PhoneInput from "react-native-phone-number-input";
import { colors } from "../../constants";

const PhoneCountryCodePicker = ({
  onChange,
  value,
  phoneCountryPrefix,
  onPhoneCountryPrefix,
  phoneCountryCode,
  onPhoneCountryCodeChange,
}) => {
  const phoneInput = useRef();

  const onCountryChange = (countryCode) => {
    onPhoneCountryPrefix(countryCode.callingCode[0]);
    onPhoneCountryCodeChange(countryCode.cca2);
  };

  return (
    <>
      <PhoneInput
        ref={phoneInput}
        defaultValue={"UK"}
        value={value}
        textInputProps={{
          value: value,
        }}
        defaultCode={phoneCountryCode}
        disableArrowIcon={true}
        onChangeText={(text) => onChange(text)}
        onChangeCountry={(country) => onCountryChange(country)}
        onChangeFormattedText={(formatedText) => console.log(formatedText)}
        countryPickerProps={{ defaultValue: phoneCountryCode }}
        style={{
          height: 44,
          backgroundColor: colors.blueColor,
          flex: 1,
          color: colors.fontPrimaryColor,
          width: "100%",
        }}
        containerStyle={{
          borderBottomWidth: 1,
          borderColor: colors.gray,
          width: "100%",
          marginBottom: 16,
        }}
        textContainerStyle={{
          height: 44,
          backgroundColor: colors.white,
          paddingHorizontal: 0,
        }}
        textInputStyle={{ height: 44 }}
        codeTextStyle={{
          height: 44,
          lineHeight: 44,
          fontSize: 14,
          width: 50,
        }}
        flagButtonStyle={{
          height: 44,
          width: 50,
        }}
      />
    </>
  );
};

export default PhoneCountryCodePicker;
