import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Typography, Shadow, Button } from "components";
import { colors } from "constants";
import { setGame } from "store/app";

import styles from "./homeStyles";

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={{ ...styles.box, backgroundColor: colors.green }}>
        <Shadow
          viewStyle={{ width: "100%" }}
          startColor={"#00376710"}
          finalColor={"#00376701"}
          offset={[0, 4]}
          distance={5}
        >
          <View>
            <Typography
              name="tinyBold"
              text={t("common-labels.real-forex")}
              style={styles.text}
            />
            <Typography
              name="medium"
              text="Learn how to get started"
              style={{ ...styles.text, marginTop: 8 }}
            />
            <Button
              size="tiny"
              type="white"
              font="tinyBold"
              text={"Play now"}
              style={{ marginTop: 21 }}
              onPress={() => {
                navigation.push("RealForexStack");
                setGame(dispatch, "RealForex");
              }}
            />
          </View>
        </Shadow>
      </View>
      <View style={{ ...styles.box, backgroundColor: colors.cyan }}>
        <Shadow
          viewStyle={{ width: "100%" }}
          startColor={"#00376710"}
          finalColor={"#00376701"}
          offset={[0, 4]}
          distance={5}
        >
          <View>
            <Typography
              name="tinyBold"
              text={t("common-labels.simplex")}
              style={styles.text}
            />
            <Typography
              name="medium"
              text="Make you first Investment today"
              style={{ ...styles.text, marginTop: 8 }}
            />
            <Button
              size="tiny"
              type="white"
              font="tinyBold"
              text={"Play now"}
              style={{ marginTop: 21 }}
              onPress={() => {
                navigation.push("SimplexStack");
                setGame(dispatch, "Simplex");
              }}
            />
          </View>
        </Shadow>
      </View>
      <View style={{ ...styles.box, backgroundColor: colors.cyan }}>
        <Shadow
          viewStyle={{ width: "100%" }}
          startColor={"#00376710"}
          finalColor={"#00376701"}
          offset={[0, 4]}
          distance={5}
        >
          <View>
            <Typography
              name="tinyBold"
              text={t("common-labels.funding")}
              style={styles.text}
            />
            <Typography
              name="medium"
              text="Make you first Investment today"
              style={{ ...styles.text, marginTop: 8 }}
            />
            <Button
              size="tiny"
              type="white"
              font="tinyBold"
              text={"Play now"}
              style={{ marginTop: 21 }}
            />
          </View>
        </Shadow>
      </View>
    </View>
  );
};

export default Home;
