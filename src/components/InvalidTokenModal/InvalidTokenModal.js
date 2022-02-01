import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography } from "components";

import { colors } from "constants";

export default function InvalidTokenModal({ logout }) {
  const { t } = useTranslation();

  return (
    <View style={{ position: "absolute", flex: 1 }}>
      <Typography name="largeBold" text={"Invalid token"}></Typography>
    </View>
  );
}
