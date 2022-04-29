import React from "react";

import { WebView } from "../../components";

import styles from "./styles";

const BrowserScreen = ({ route }) => {
  return (
    <WebView style={styles.container} source={{ uri: route.params?.url }} />
  );
};

export default BrowserScreen;
