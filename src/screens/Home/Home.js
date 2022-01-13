import React from "react";
import { View } from "react-native";

import { Typography, Button } from "components";

const Home = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography name="largeBold" text={"Welcome"}></Typography>
      <Button
        style={{ marginTop: 15 }}
        text="Go to Login Screen"
        type="primary"
        font="mediumBold"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        style={{ marginTop: 40 }}
        text="Go to Register Screen"
        type="primary"
        font="mediumBold"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default Home;
