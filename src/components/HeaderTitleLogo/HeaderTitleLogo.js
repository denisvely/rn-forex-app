import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import Typography from "../../components/Typography/Typography";
import headerLogo from "../../assets/svg/headerLogo";
import { colors } from "../../constants";

const HeaderTitleLogo = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SvgXml xml={headerLogo} width="40" height="40" />
      <Typography
        name="bigNormal"
        text={"EXA Dynamic"}
        style={{ color: colors.fontPrimaryColor }}
      />
    </View>
  );
};
export default HeaderTitleLogo;
