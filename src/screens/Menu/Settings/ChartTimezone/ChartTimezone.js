import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";

import { View, Pressable, TouchableOpacity } from "react-native";
import { Typography, Button } from "../../../../components";
import { getUser } from "../../../../store/app";
import dropdownArrow from "../../../../assets/svg/realForex/dropdownArrow";

import styles from "../settingsStyles";

const ChartTimezone = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));
  const [chartTimezone, setChartTimezone] = useState(user.forexModeId);
  const [isContentVisible, setContentVisible] = useState(false);

  const changeTimezone = (id) => {
    //   TODO => When chart is ready
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
                onPress={() => setChartTimezone(2)}
                style={styles.directionButton}
              >
                <View style={styles.btnContainer}>
                  {chartTimezone === 2 ? (
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
                      chartTimezone === 2
                        ? styles.btnTextActive
                        : styles.btnText
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
                onPress={() => setChartTimezone(3)}
                style={styles.directionButton}
              >
                <View style={styles.btnContainer}>
                  {chartTimezone === 3 ? (
                    <View style={styles.checkboxActiveView}>
                      <View style={styles.whiteDot} />
                    </View>
                  ) : (
                    <View style={styles.checkboxView}>
                      <View style={styles.whiteDot} />
                    </View>
                  )}
                  <Typography name="normal" text={t(`menu.localPcTime`)} />
                </View>
              </Pressable>
            </View>
          </View>
          <Button
            text={t("common-labels.accept")}
            type="primary"
            font="mediumBold"
            size="big"
            style={styles.acceptBtn}
            onPress={() => changeTimezone()}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ChartTimezone;
