import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";

import { View, TouchableOpacity } from "react-native";
import { Typography, SwitchComponent } from "../../../../components";
import { getUser, setUser } from "../../../../store/app";
import dropdownArrow from "../../../../assets/svg/realForex/dropdownArrow";
import TradingModesService from "./services/TradingModesService";
import userService from "../../../../services/userService";
import { colors } from "../../../../constants";

const changeForexMode = TradingModesService.changeForexMode();
const changeHedgingForexMode = TradingModesService.changeHedgingForexMode();

import styles from "../settingsStyles";

const TradingModes = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));
  const [userForexModeId, setModeId] = useState(user.forexModeId);
  const [isHedgnetActive, setHedgnet] = useState(
    user.forexModeId === 3 && user.forexMarginModeId === 1 ? true : false
  );
  const [isContentVisible, setContentVisible] = useState(false);

  const changeHedgForexMode = (value) => {
    setHedgnet(value);
    changeHedgingForexMode
      .fetch({
        mode: value ? 1 : 0,
      })
      .then(({ response }) => {
        if (response.body.code === 200) {
          setHedgnet(value);
          Toast.show({
            type: "platformInfoSuccess",
            props: {
              text1: `${t("menu.changeMarginMode")}`,
              text2: `Hedging mode margin mode has been changed successfully.`,
            },
            topOffset: 100,
            visibilityTime: 3000,
            autoHide: true,
          });
          userService
            .getUser()
            .fetch()
            .then(({ response }) => {
              if (response.body.code !== 200) {
                return;
              }
              const body = response.getBody();
              setUser(dispatch, body);
            });
        } else {
          setHedgnet(!value);
          Toast.show({
            type: "platformInfoError",
            props: {
              text1: `${t("menu.changeMarginMode")}`,
              text2: `There are open trades.`,
            },
            topOffset: 100,
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeModeId = () => {
    if (user.forexModeId === userForexModeId) {
      Toast.show({
        type: "error",
        text1: `You are already on that mode.`,
        topOffset: 100,
      });
      return;
    }
    changeForexMode
      .fetch({
        modeId: userForexModeId,
      })
      .then(({ response }) => {
        if (response.body.code === 200) {
          userService
            .getUser()
            .fetch()
            .then(({ response }) => {
              if (response.body.code !== 200) {
                return;
              }
              const body = response.getBody();
              if (body.forexModeId === 2) {
                changeHedgingForexMode.fetch({
                  mode: 0,
                });
                setHedgnet(false);
              }
              setUser(dispatch, body);
              Toast.show({
                type: "platformInfoSuccess",
                props: {
                  text1: `${
                    userForexModeId === 2
                      ? t("menu.changeModeToAggTitle")
                      : t("menu.changeModeToHedgTitle")
                  }`,
                  text2: `${t("menu.changeModeSuccess")}`,
                },
                topOffset: 100,
                visibilityTime: 3000,
                autoHide: true,
              });
            });
        } else {
          Toast.show({
            type: "platformInfoError",
            props: {
              text1: `${
                userForexModeId === 2
                  ? t("menu.changeModeToAggTitle")
                  : t("menu.changeModeToHedgTitle")
              }`,
              text2: `${
                userForexModeId === 2
                  ? t("menu.changeModeToAggFail")
                  : t("menu.changeModeToHedgFail")
              }`,
            },
            topOffset: 100,
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.tradeBox}>
      <TouchableOpacity
        style={styles.tradeBoxButton}
        onPress={() => setContentVisible(!isContentVisible)}
      >
        <Typography
          name="normal"
          style={styles.btnText}
          text={t(`menu.tradingModes`)}
        />
        <SvgXml
          style={isContentVisible ? styles.rotatedArrow : styles.arrow}
          xml={dropdownArrow}
          width="32"
          height="32"
        />
      </TouchableOpacity>
      {isContentVisible ? (
        <View style={styles.tradingModes}>
          <View style={styles.box}>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => setModeId(2)}
                style={styles.directionButton}
              >
                <View style={styles.btnContainer}>
                  {userForexModeId === 2 ? (
                    <View style={styles.checkboxActiveView}>
                      <View style={styles.whiteDot} />
                    </View>
                  ) : (
                    <View style={styles.checkboxView}>
                      <View style={styles.whiteDot} />
                    </View>
                  )}
                  <Typography
                    name="normal"
                    style={
                      userForexModeId === 2
                        ? styles.btnTextActive
                        : styles.btnText
                    }
                    text={
                      user.forexModeId === 2
                        ? t(`menu.aggretatingMode`)
                        : t(`menu.aggretatingModeSwitch`)
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Typography
              name="small"
              text={t(`menu.aggretatingModeInfo`)}
              style={styles.text}
            />
          </View>
          <View style={styles.box}>
            <View style={styles.hedgingWrapper}>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => setModeId(3)}
                  style={styles.directionButton}
                >
                  <View style={styles.btnContainer}>
                    {userForexModeId === 3 ? (
                      <View style={styles.checkboxActiveView}>
                        <View style={styles.whiteDot} />
                      </View>
                    ) : (
                      <View style={styles.checkboxView}>
                        <View style={styles.whiteDot} />
                      </View>
                    )}
                    <Typography
                      name="normal"
                      text={
                        user.forexModeId === 3
                          ? t(`menu.hedgingMode`)
                          : t(`menu.hedgingModeSwitch`)
                      }
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <Typography
                name="small"
                text={t("menu.hedgingModeInfo")}
                style={styles.text}
              />
            </View>
            <View style={styles.nettingRow}>
              <SwitchComponent
                onValueChange={(value) => changeHedgForexMode(value)}
                value={isHedgnetActive}
                style={styles.switch}
                disabled={user.forexModeId === 2}
              />
              <Typography name="normal" text={t(`menu.switchMarginNet`)} />
            </View>
            <View style={styles.row}>
              <Typography
                name="small"
                text={t("menu.nettingInfo")}
                style={styles.text}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => changeModeId()}
            style={styles.acceptBtn}
          >
            <Typography
              name="mediumBold"
              text={t("common-labels.accept")}
              style={{ color: colors.white }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default TradingModes;
