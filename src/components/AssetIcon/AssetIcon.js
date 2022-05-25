import React from "react";
import PropTypes from "prop-types";
import { SvgXml } from "react-native-svg";
import assetsIcons from "../../assets/svg/assetIcons/assetsIcons";

const AssetIcon = ({ asset, style, width, height }) => {
  const dualFlag = asset.name.indexOf("/") > -1;

  if (dualFlag) {
    var leftName = asset.name.split("/")[0].toLowerCase(),
      rightName = asset.name.split("/")[1].toLowerCase();
  }

  const assetIconName = dualFlag
    ? leftName + rightName
    : asset.name
        .replace("'", "")
        .replace("&", "")
        .replace(" ", "")
        .replace(" ", "")
        .replace("-", "")
        .toLowerCase();

  const assetIcon = assetsIcons[assetIconName]
    ? assetsIcons[assetIconName][0]
    : assetsIcons["default"][0];
    
  return (
    <SvgXml
      xml={assetIcon}
      width={width ? width : 40}
      height={height ? height : 40}
      style={{ ...style }}
    />
  );
};

AssetIcon.propTypes = {
  asset: PropTypes.object,
  style: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default AssetIcon;
