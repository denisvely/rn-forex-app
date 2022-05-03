import React from "react";
import { View } from "react-native";
import { Typography } from "../../../../components";

import styles from "./changePasswordStyles";

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <Typography text="ChangePassword" name="largeBold" />
    </View>
  );
};

export default ChangePassword;
