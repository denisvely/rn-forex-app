import React from "react";
import { View, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";
import favouritesListStyles from "./favouritesIconStyles";

const Favouritesvg = `<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.375 7.21875L14.6719 6.39844L12.0938 1.20312C11.6641 0.304688 10.3359 0.265625 9.86719 1.20312L7.32812 6.39844L1.58594 7.21875C0.570312 7.375 0.179688 8.625 0.921875 9.36719L5.02344 13.3906L4.04688 19.0547C3.89062 20.0703 4.98438 20.8516 5.88281 20.3828L11 17.6875L16.0781 20.3828C16.9766 20.8516 18.0703 20.0703 17.9141 19.0547L16.9375 13.3906L21.0391 9.36719C21.7812 8.625 21.3906 7.375 20.375 7.21875ZM14.9062 12.7266L15.8438 18.1172L11 15.5781L6.11719 18.1172L7.05469 12.7266L3.10938 8.89844L8.53906 8.11719L11 3.19531L13.4219 8.11719L18.8516 8.89844L14.9062 12.7266Z" fill="black"/>
</svg>
`;

const FavouritesIcon = ({ navigation }) => {
  return (
    <Pressable style={favouritesListStyles.btnContainerClick}>
      <View style={favouritesListStyles.btnContainer}>
        <View
          style={{
            ...favouritesListStyles.svgContainer,
          }}
        >
          <SvgXml xml={Favouritesvg} width="20" height="20" />
        </View>
      </View>
    </Pressable>
  );
};

FavouritesIcon.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default FavouritesIcon;
