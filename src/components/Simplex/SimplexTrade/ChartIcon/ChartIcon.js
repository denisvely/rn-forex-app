import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { getSelectedAsset } from "../../../../store/simplex";

import styles from "./chartIconStyles";

const chartSvg = `<svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.6719 4.13281C20.9062 4.21094 21.1016 4.25 21.375 4.25C22.3906 4.25 23.25 3.42969 23.25 2.375C23.25 1.35938 22.3906 0.5 21.375 0.5C20.3203 0.5 19.5 1.35938 19.5 2.375C19.5 2.49219 19.5 2.57031 19.5 2.6875L15.7891 5.65625C15.5547 5.57812 15.3594 5.5 15.0859 5.5C14.8516 5.5 14.6562 5.57812 14.4219 5.65625L10.7109 2.6875C10.7109 2.57031 10.75 2.49219 10.75 2.375C10.75 1.35938 9.89062 0.5 8.875 0.5C7.82031 0.5 7 1.35938 7 2.375C7 2.57031 7 2.72656 7.03906 2.88281L3.09375 6.82812C2.9375 6.78906 2.78125 6.75 2.625 6.75C1.57031 6.75 0.75 7.60938 0.75 8.625C0.75 9.67969 1.57031 10.5 2.625 10.5C3.64062 10.5 4.5 9.67969 4.5 8.625C4.5 8.46875 4.46094 8.3125 4.42188 8.15625L8.36719 4.21094C8.52344 4.25 8.67969 4.25 8.875 4.25C9.10938 4.25 9.30469 4.21094 9.53906 4.13281L13.25 7.10156C13.25 7.21875 13.25 7.29688 13.25 7.375C13.25 8.42969 14.0703 9.25 15.125 9.25C16.1406 9.25 17 8.42969 17 7.375C17 7.29688 16.9609 7.21875 16.9609 7.10156L20.6719 4.13281ZM16.375 13H13.875C13.5234 13 13.25 13.3125 13.25 13.625V19.875C13.25 20.2266 13.5234 20.5 13.875 20.5H16.375C16.6875 20.5 17 20.2266 17 19.875V13.625C17 13.3125 16.6875 13 16.375 13ZM22.625 8H20.125C19.7734 8 19.5 8.3125 19.5 8.625V19.875C19.5 20.2266 19.7734 20.5 20.125 20.5H22.625C22.9375 20.5 23.25 20.2266 23.25 19.875V8.625C23.25 8.3125 22.9375 8 22.625 8ZM10.125 8H7.625C7.27344 8 7 8.3125 7 8.625V19.875C7 20.2266 7.27344 20.5 7.625 20.5H10.125C10.4375 20.5 10.75 20.2266 10.75 19.875V8.625C10.75 8.3125 10.4375 8 10.125 8ZM3.875 14.25H1.375C1.02344 14.25 0.75 14.5625 0.75 14.875V19.875C0.75 20.2266 1.02344 20.5 1.375 20.5H3.875C4.1875 20.5 4.5 20.2266 4.5 19.875V14.875C4.5 14.5625 4.1875 14.25 3.875 14.25Z" fill="#333333"/>
</svg>
`;

const ChartIcon = ({ navigation }) => {
  const selectedAsset = useSelector((state) => getSelectedAsset(state));

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.btnContainerClick}
      onPress={() =>
        navigation.navigate("SimplexOrderChart", { asset: selectedAsset })
      }
    >
      <View style={styles.btnContainer}>
        <View>
          <SvgXml xml={chartSvg} width="20" height="20" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

ChartIcon.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ChartIcon;
