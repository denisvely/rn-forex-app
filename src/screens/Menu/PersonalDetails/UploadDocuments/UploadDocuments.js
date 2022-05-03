import React from "react";
import { View } from "react-native";
import { Typography } from "../../../../components";

import styles from "./uploadDocumentsStyles";

const uploadDocuments = () => {
  return (
    <View style={styles.container}>
      <Typography text="uploadDocuments" name="largeBold" />
    </View>
  );
};

export default uploadDocuments;
