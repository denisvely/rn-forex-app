import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSelector, useDispatch } from "react-redux";

import {
  Typography,
  FormattedTypographyWithCurrency,
  Loading,
} from "../../../components";
import {
  getRealForexBalance,
  getBalance,
  getRealForexPrices,
  getRealForexTradingSettings,
  getRealForexOpenPositions,
} from "../../../store/realForex";
import { getUser } from "../../../store/app";
import { colors } from "constants";
import { convertUnits } from "../../../store/realForex/helpers";

import styles from "./balanceStyles";

const Balance = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const realForexBalance = useSelector((state) => getRealForexBalance(state));
  const user = useSelector((state) => getUser(state));
  const realForexPrices = useSelector((state) => getRealForexPrices(state));
  const tradingSettings = useSelector((state) =>
    getRealForexTradingSettings(state)
  );
  const openPositions = useSelector((state) =>
    getRealForexOpenPositions(state)
  );
  const [isReady, setReady] = useState(false);
  const initalBalanceData = {
    balance: null,
    profit: null,
    marginPercent: null,
    forexMargin: null,
    equity: null,
    availableBalance: null,
  };
  const [userRealForexBalance, setBalance] = useState(initalBalanceData);

  const recalculateMarginValues = () => {
    let totalProfit = 0,
      totalMargin = 0,
      equity = 0;

    openPositions.forEach((item, index) => {
      // add swap
      if (item.swap !== "" && !isNaN(item.swap)) {
        totalProfit += parseFloat(item.swap);
      }

      // add result
      if (typeof realForexPrices != "undefined" && realForexPrices != null) {
        if (realForexPrices[item.tradableAssetId] != undefined) {
          if (item.actionType == "Sell") {
            totalProfit += parseFloat(
              parseFloat(
                item.rate - realForexPrices[item.tradableAssetId].ask
              ) *
                parseFloat(item.volume) *
                (1 / item.exchangeRate)
            );
          } else {
            totalProfit += parseFloat(
              parseFloat(
                realForexPrices[item.tradableAssetId].bid - item.rate
              ) *
                parseFloat(item.volume) *
                (1 / item.exchangeRate)
            );
          }
        }
      }

      if (user.forexModeId === 3 && user.forexMarginModeId === 1) {
        let checkedAssets = [];
        for (let k = 0; k < openPositions.length; k++) {
          if (openPositions[k].optionType === "HARealForex") {
            if (
              checkedAssets.indexOf(openPositions[k].tradableAssetId) === -1
            ) {
              checkedAssets.push(openPositions[k].tradableAssetId);

              let totalBuyMargin = 0;
              let totalSellMargin = 0;
              let currResult =
                ((openPositions[k].actionType === "Sell"
                  ? realForexPrices[openPositions[k].tradableAssetId].bid
                  : realForexPrices[openPositions[k].tradableAssetId].ask) *
                  parseFloat(
                    convertUnits(
                      openPositions[k].volume,
                      openPositions[k].tradableAssetId,
                      !tradingSettings.IsVolumeInUnits,
                      tradingSettings
                    )
                  )) /
                (openPositions[k].leverage * openPositions[k].exchangeRate);

              if (openPositions[k].actionType === "Sell") {
                if (!isNaN(currResult)) {
                  totalSellMargin += parseFloat(currResult);
                }
              } else {
                if (!isNaN(currResult)) {
                  totalBuyMargin += parseFloat(currResult);
                }
              }

              for (let l = k + 1; l < openPositions.length; l++) {
                if (
                  openPositions[k].tradableAssetId ===
                  openPositions[l].tradableAssetId
                ) {
                  currResult =
                    ((openPositions[l].actionType === "Sell"
                      ? realForexPrices[openPositions[l].tradableAssetId].bid
                      : realForexPrices[openPositions[l].tradableAssetId].ask) *
                      parseFloat(
                        convertUnits(
                          openPositions[l].volume,
                          openPositions[l].tradableAssetId,
                          !tradingSettings.IsVolumeInUnits,
                          tradingSettings
                        )
                      )) /
                    (openPositions[l].leverage * openPositions[l].exchangeRate);

                  if (openPositions[l].actionType === "Sell") {
                    if (!isNaN(currResult)) {
                      totalSellMargin += parseFloat(currResult);
                    }
                  } else {
                    if (!isNaN(currResult)) {
                      totalBuyMargin += parseFloat(currResult);
                    }
                  }
                }
              }

              totalMargin += Math.abs(totalBuyMargin - totalSellMargin);
            }
          }
        }
      } else {
        totalMargin +=
          ((item.actionType === "Sell"
            ? realForexPrices[item.tradableAssetId].bid
            : realForexPrices[item.tradableAssetId].ask) *
            parseFloat(
              convertUnits(
                item.volume,
                item.tradableAssetId,
                !tradingSettings.IsVolumeInUnits,
                tradingSettings
              )
            )) /
          (item.leverage * item.exchangeRate);
      }

      if (realForexBalance) {
        equity = parseFloat(realForexBalance.balance) + parseFloat(totalProfit);

        if (!isNaN(totalProfit)) {
          setBalance((prevState) => ({
            ...prevState,
            profit: totalProfit,
          }));
        }
        setBalance((prevState) => ({
          ...prevState,
          forexMargin: totalMargin,
          equity: equity,
          availableBalance: equity - totalMargin,
          marginPercent: isNaN(
            parseInt((totalMargin * parseFloat(user.MarginUsage)) / equity)
          )
            ? 0
            : parseInt((totalMargin * parseFloat(user.MarginUsage)) / equity),
        }));
      }
    });
  };

  useEffect(() => {
    if (realForexPrices) {
      recalculateMarginValues();
    }
  }, [realForexPrices]);

  useEffect(() => {
    getBalance(dispatch);
  }, []);

  useEffect(() => {
    if (realForexBalance) {
      setBalance((prevState) => ({
        ...prevState,
        balance: realForexBalance.balance,
        profit: realForexBalance.profit,
        marginPercent: realForexBalance.marginPercent,
        forexMargin: realForexBalance.forexMargin,
        equity: realForexBalance.equity,
        availableBalance: realForexBalance.availableBalance,
      }));
      setReady(true);
    }
  }, [realForexBalance]);

  return (
    <View style={styles.container}>
      {isReady ? (
        <>
          <View style={styles.balanceContainer}>
            <View style={{ marginRight: 16 }}>
              <Typography
                name="tiny"
                text={t(`common-labels.balance`)}
                style={styles.balanceLabel}
              ></Typography>
              <FormattedTypographyWithCurrency
                name="largeBold"
                text={userRealForexBalance.balance}
                numberWithCommas={false}
                style={styles.balanceBig}
              />
            </View>
            <View>
              <Typography
                name="tiny"
                text={t(`common-labels.profit`)}
                style={styles.balanceLabel}
              ></Typography>
              <FormattedTypographyWithCurrency
                name="smallBold"
                text={userRealForexBalance.profit}
                style={{
                  ...styles.profit,
                  color:
                    userRealForexBalance.profit > 0
                      ? colors.buyColor
                      : colors.sellColor,
                }}
              />
            </View>
          </View>
          <View style={styles.marginContainer}>
            <View style={styles.marginInfoWrapper}>
              <View style={styles.circleProgress}>
                <AnimatedCircularProgress
                  size={40}
                  width={8}
                  fill={parseInt(userRealForexBalance.marginPercent)}
                  rotation={360}
                  tintColor={colors.blueColor}
                  tintColorSecondary={colors.blueColor}
                  backgroundColor="rgba(124, 124, 125, 0.3)"
                >
                  {(fill) => (
                    <View style={styles.circleChilds}>
                      <Typography
                        name="nanoBold"
                        color={null}
                        text={`${parseInt(
                          userRealForexBalance.marginPercent
                        )}%`}
                        style={styles.circleStats}
                      />
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>
              <View style={styles.marginInfo}>
                <Typography
                  name="tiny"
                  style={styles.balanceLabel}
                  text={t(`common-labels.margin`)}
                />
                <FormattedTypographyWithCurrency
                  name="tinyBold"
                  text={userRealForexBalance.forexMargin}
                  style={styles.balanceValue}
                />
              </View>
            </View>
            <View style={styles.equityWrapper}>
              <Typography
                name="tiny"
                style={styles.balanceLabel}
                text={t(`common-labels.equity`)}
              ></Typography>
              <FormattedTypographyWithCurrency
                name="tinyBold"
                text={userRealForexBalance.equity}
                style={styles.balanceValue}
              />
            </View>
            <View style={styles.equityWrapper}>
              <Typography
                name="tiny"
                style={styles.balanceLabel}
                text={t(`common-labels.availableBalance`)}
              ></Typography>
              <FormattedTypographyWithCurrency
                name="tinyBold"
                text={userRealForexBalance.availableBalance}
                style={styles.balanceValue}
              />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Loading size="large" />
        </View>
      )}
    </View>
  );
};

export default Balance;
