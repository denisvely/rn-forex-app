import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";

import { getSimplexPrices } from "../../../store/simplex";
import Typography from "../../../components/Typography/Typography";
import AssetIcon from "../../../components/AssetIcon/AssetIcon";
import BuyPriceSimplex from "../../../components/Simplex/BuyPrice/BuyPrice";
import { getApplication } from "../../../store/app";
import arrowDown from "../../../assets/svg/Simplex/arrowDown";
import arrowUp from "../../../assets/svg/Simplex/arrowUp";
import { remainingTime } from "../../../store/realForex/helpers";
import { setSelectedAsset } from "../../../store/simplex";

import styles from "./assetBoxStyles";
import { colors } from "../../../constants";

const AssetBox = ({ asset, navigation, marketClosed }) => {
  const simplexPrices = useSelector((state) => getSimplexPrices(state));
  const app = useSelector((state) => getApplication(state));
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  return (
    simplexPrices && (
      <View
        style={marketClosed ? styles.assetBoxMarketClosed : styles.assetBox}
      >
        {marketClosed ? (
          <TouchableOpacity style={styles.assetBoxButton} activeOpacity={0.5}>
            <View
              style={{
                ...styles.left,
                borderRightColor: colors.systemColorInactive,
              }}
            >
              <AssetIcon asset={asset} style={styles.assetIcon} />
              <View>
                <Typography
                  name="bigNormalBold"
                  text={asset.name}
                  style={styles.assetName}
                />
              </View>
            </View>
            <View style={styles.right}>
              <View style={styles.marketClosedInfo}>
                <Typography
                  name="normal"
                  text={t(`common-labels.marketClosed`)}
                  style={{ marginBottom: 8 }}
                />
                <Typography
                  name="nano"
                  text={`This market opens at ${remainingTime(
                    asset
                  )}. You can place pending orders even when the market is closed.`}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.assetBoxButton}
            activeOpacity={0.5}
            onPress={() => {
              setSelectedAsset(dispatch, asset);
              navigation.navigate("SimplexOrderDetails", { asset });
            }}
          >
            <View style={styles.left}>
              <AssetIcon asset={asset} style={styles.assetIcon} />
              <View>
                <Typography
                  name="bigNormalBold"
                  text={asset.name}
                  style={styles.assetName}
                />
              </View>
            </View>
            <View style={styles.right}>
              <Typography
                name="smallRegular"
                style={{
                  color: colors.fontSecondaryColor,
                }}
                text={"Price"}
              />
              <BuyPriceSimplex asset={asset} />
              <Typography
                name="smallRegular"
                style={{
                  color: colors.fontSecondaryColor,
                }}
                text={"Daily change"}
              />
              <View style={styles.dailyChangeWrapper}>
                <SvgXml
                  xml={
                    parseFloat(
                      calculateSpread(
                        simplexPrices[asset.id].ask,
                        simplexPrices[asset.id].bid,
                        app.dailyChanges
                          ? app.dailyChanges[asset.id].OpenPrice
                          : 0
                      ).replace("%", "")
                    ) < 0
                      ? arrowDown
                      : arrowUp
                  }
                  width={20}
                  height={22}
                />
                <Typography
                  name="small"
                  text={calculateSpread(
                    simplexPrices[asset.id].ask,
                    simplexPrices[asset.id].bid,
                    app.dailyChanges ? app.dailyChanges[asset.id].OpenPrice : 0
                  )}
                  style={
                    parseFloat(
                      calculateSpread(
                        simplexPrices[asset.id].ask,
                        simplexPrices[asset.id].bid,
                        app.dailyChanges
                          ? app.dailyChanges[asset.id].OpenPrice
                          : 0
                      ).replace("%", "")
                    ) < 0
                      ? styles.negative
                      : styles.profit
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  );
};

export default AssetBox;
