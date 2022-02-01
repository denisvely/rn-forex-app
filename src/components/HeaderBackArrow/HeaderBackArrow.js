import React from "react";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";

const xml = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.2969 25.0938L20.5703 24.8203C20.7656 24.625 20.7656 24.3516 20.5703 24.1562L12.9531 16.5L20.5703 8.88281C20.7656 8.6875 20.7656 8.41406 20.5703 8.21875L20.2969 7.94531C20.1016 7.75 19.8281 7.75 19.6328 7.94531L11.3906 16.1875C11.1953 16.3828 11.1953 16.6562 11.3906 16.8516L19.6328 25.0938C19.8281 25.2891 20.1016 25.2891 20.2969 25.0938Z" fill="#5F6368"/>
</svg>
`;

const HeaderBackArrow = ({ marginProp }) => {
  return (
    <SvgXml
      xml={xml}
      width="32"
      height="32"
      style={{ marginTop: marginProp ? 80 : 0 }}
    />
  );
};

HeaderBackArrow.propTypes = {
  marginProp: PropTypes.bool,
};

HeaderBackArrow.defaultProps = {
  marginProp: false,
};

export default HeaderBackArrow;
