import React, { useState } from "react";
import CountryPicker from "react-native-country-picker-modal";

const CountryPickerComponent = ({
  selectedCountryCode,
  changeCountry,
  style,
  customContryCodeList,
}) => {
  const [countryCode, setCountryCode] = useState(selectedCountryCode);

  const onSelect = (country) => {
    changeCountry(country.cca2);
    setCountryCode(country.cca2);
  };

  return (
    <CountryPicker
      theme={{ ...style }}
      countryCodes={customContryCodeList}
      {...{
        countryCode,
        withFilter: true,
        withFlag: true,
        withCountryNameButton: true,
        withAlphaFilter: false,
        withCallingCode: false,
        withEmoji: true,
        onSelect,
      }}
    />
  );
};

export default CountryPickerComponent;
