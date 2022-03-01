import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

const xml = `<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.28906 6.5L12.3125 2.51562L13.1328 1.69531C13.25 1.57812 13.25 1.38281 13.1328 1.22656L12.2734 0.367188C12.1172 0.25 11.9219 0.25 11.8047 0.367188L7 5.21094L2.15625 0.367188C2.03906 0.25 1.84375 0.25 1.6875 0.367188L0.828125 1.22656C0.710938 1.38281 0.710938 1.57812 0.828125 1.69531L5.67188 6.5L0.828125 11.3438C0.710938 11.4609 0.710938 11.6562 0.828125 11.8125L1.6875 12.6719C1.84375 12.7891 2.03906 12.7891 2.15625 12.6719L7 7.82812L10.9844 11.8516L11.8047 12.6719C11.9219 12.7891 12.1172 12.7891 12.2734 12.6719L13.1328 11.8125C13.25 11.6562 13.25 11.4609 13.1328 11.3438L8.28906 6.5Z" fill="#333333"/>
</svg>
`;

const HeaderX = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onPress()}>
        <SvgXml xml={xml} width="16" height="16" />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderX;
