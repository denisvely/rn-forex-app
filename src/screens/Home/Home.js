import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Typography } from "../../components";
import { setGame, setDailyChanges } from "../../store/app";

import styles from "./homeStyles";
import axios from "axios";

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  axios("https://advfeed.finte.co/Services.ashx/GetDailyChanges")
    .then((fetchResponse) => {
      setDailyChanges(dispatch, JSON.parse("{" + fetchResponse.data + "}"));
    })
    .catch((error) => {
      console.log("Error getting Daily changes: " + JSON.stringify(error));
    });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.box }}
        onPress={() => {
          navigation.push("RealForexStack");
          setGame(dispatch, "RealForex");
        }}
      >
        <Image
          style={{
            ...styles.box,
            position: "absolute",
            top: 0,
            left: 0,
            resizeMode: "stretch",
          }}
          source={require("../../../assets/forex.png")}
        />
        <View>
          <Typography
            name="tinyBold"
            text={t("common-labels.real-forex")}
            style={{
              ...styles.text,
              fontSize: 24,
              lineHeight: 28,
              marginTop: 48,
            }}
          />
          <Typography
            name="small"
            text="An advanced versatile trading platform"
            style={{ ...styles.text, marginTop: 3, lineHeight: 19 }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.box }}
        onPress={() => {
          navigation.push("SimplexStack");
          setGame(dispatch, "EasyForex");
        }}
      >
        <Image
          style={{
            ...styles.box,
            position: "absolute",
            top: 0,
            left: 0,
            resizeMode: "stretch",
          }}
          source={require("../../../assets/simplex.png")}
        />
        <View>
          <Typography
            name="tinyBold"
            text={t("common-labels.simplex")}
            style={{
              ...styles.text,
              fontSize: 24,
              lineHeight: 28,
              marginTop: 48,
            }}
          />
          <Typography
            name="small"
            text="Simplified and easy to use Forex platform"
            style={{ ...styles.text, marginTop: 3, lineHeight: 19 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
