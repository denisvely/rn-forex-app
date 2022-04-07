import React from "react";
import { View, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { getSimplexPrices } from "../../../store/simplex";
import Typography from "../../../components/Typography/Typography";
import BuyPriceSimplex from "../../../components/Simplex/BuyPrice/BuyPrice";
import styles from "./assetBoxStyles";
import { getApplication } from "../../../store/app";
import assetsIcons from "../../../assets/svg/assetIcons/assetsIcons";

const AssetBox = ({ asset, navigation }) => {
  const simplexPrices = useSelector((state) => getSimplexPrices(state));
  const app = useSelector((state) => getApplication(state));
  const dualFlag = asset.name.indexOf("/") > -1;
  if (dualFlag) {
    var leftName = asset.name.split("/")[0].toLowerCase(),
      rightName = asset.name.split("/")[1].toLowerCase();
  }

  const assetIconName = dualFlag
    ? leftName + rightName
    : asset.name.replace("'", "").replace("&", "").toLowerCase();

  const assetIcon = assetsIcons[assetIconName]
    ? assetsIcons[assetIconName][0]
    : assetsIcons["default"][0];

  const calculateSpread = (askPrice, bidPrice, openPrice) => {
    return (
      (openPrice
        ? (
            (((parseFloat(askPrice) + parseFloat(bidPrice)) / 2 -
              parseFloat(openPrice)) /
              parseFloat(openPrice)) *
            100
          ).toFixed(2)
        : "0.00") + "%"
    );
  };

  const navigateChart = () => {
    navigation.navigate("RealForexOrderChart", { asset });
  };

  return (
    simplexPrices && (
      <View style={styles.assetBox}>
        <Pressable style={styles.assetBoxButton} onPress={navigateChart}>
          <View style={styles.left}>
            <SvgXml
              style={styles.assetIcon}
              xml={assetIcon}
              width="40"
              height="40"
            />
            <View>
              <Typography text={asset.name} style={styles.assetName} />
            </View>
          </View>
          <View style={styles.right}>
            <Typography
              style={{
                fontFamily: "Gilroy-Regular",
                fontSize: 14,
                lineHeight: 16,
                color: "#777777",
              }}
              text={"Price"}
            />
            <BuyPriceSimplex asset={asset} />
            <Typography
              style={{
                fontFamily: "Gilroy-Regular",
                fontSize: 14,
                lineHeight: 16,
                color: "#777777",
                marginTop: 8,
              }}
              text={"Daily change"}
            />
            <Typography
              name="small"
              text={calculateSpread(
                simplexPrices[asset.id].ask,
                simplexPrices[asset.id].bid,
                app.dailyChanges ? app.dailyChanges[asset.id].OpenPrice : 0
              )}
              style={styles.profit}
            />
          </View>
        </Pressable>
      </View>
    )
  );
};

export default AssetBox;
