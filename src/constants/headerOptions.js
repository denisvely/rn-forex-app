import React from "react";

import { HeaderBackArrow } from "../components/HeaderBackArrow/HeaderBackArrow";

import colors from "./colors";

export default {
  arrowBackWithoutTitle: {
    title: "",
    headerBackTitle: "",
    headerTransparent: true,
    headerBackTitleVisible: false,
    headerBackImage: () => <HeaderBackArrow />,
  },
  arrowBackWithoutTitleNoMargin: {
    headerBackTitle: "",
    headerTitleAlign: "center",
    headerBackImage: () => <HeaderBackArrow />,
  },
  whiteBackgroundHeader: {
    headerStyle: {
      elevation: 0,
      shadowColor: "transparent",
      backgroundColor: colors.white,
    },
  },
  greyBackgroundHeader: {
    headerStyle: {
      backgroundColor: colors.gray,
      shadowColor: "transparent",
      elevation: 0,
    },
  },
  leftAndRightPadding: {
    headerLeftContainerStyle: {
      paddingLeft: 16,
      paddingBottom: 8,
    },
    headerRightContainerStyle: {
      paddingRight: 16,
      paddingBottom: 8,
    },
  },
  headerTitleStyle: {
    headerTitleStyle: {
      // fontFamily: "Muller-Bold",
      color: colors.black,
      fontSize: 18,
    },
  },
};
