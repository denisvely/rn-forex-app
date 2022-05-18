import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";

import { View, Pressable, TouchableOpacity } from "react-native";
import { Typography } from "../../../../components";
import dropdownArrow from "../../../../assets/svg/realForex/dropdownArrow";
import { Storage } from "../../../../utils";
import { colors } from "../../../../constants";

import styles from "../settingsStyles";

const ChartTimezone = () => {
  const { t } = useTranslation();
  const [isEuropeAthens, setChartTimezone] = useState(0);
  const [isContentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    Storage.get("timezone").then((result) => {
      if (result === "Europe/Athens") {
        setChartTimezone(true);
      } else {
        setChartTimezone(false);
      }
    });
  }, []);

  const changeTimezone = () => {
    if (isEuropeAthens) {
      Storage.set("timezone", "Europe/Athens");
      Toast.show({
        type: "platformInfoSuccess",
        props: {
          text1: `${t("menu.europeAthens")}`,
          text2: `${t("menu.timezoneChanged")}`,
        },
        topOffset: 100,
        visibilityTime: 5000,
        autoHide: true,
      });
    } else {
      Storage.set("timezone", Intl.DateTimeFormat().resolvedOptions().timeZone);
      Toast.show({
        type: "platformInfoSuccess",
        props: {
          text1: `${t("menu.localPcTime")}`,
          text2: `${t("menu.timezoneChanged")}`,
        },
        topOffset: 100,
        visibilityTime: 5000,
        autoHide: true,
      });
    }
    setContentVisible(false);
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
          text={t(`menu.chartTimezone`)}
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
              <Pressable
                onPress={() => setChartTimezone(true)}
                style={styles.directionButton}
              >
                <View style={styles.btnContainer}>
                  {isEuropeAthens ? (
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
                      isEuropeAthens ? styles.btnTextActive : styles.btnText
                    }
                    text={t(`menu.europeAthens`)}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.row}>
              <Pressable
                onPress={() => setChartTimezone(false)}
                style={styles.directionButton}
              >
                <View style={styles.btnContainer}>
                  {!isEuropeAthens ? (
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
                      !isEuropeAthens ? styles.btnTextActive : styles.btnText
                    }
                    text={t(`menu.localPcTime`)}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => changeTimezone()}
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

export default ChartTimezone;
